import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../_services/data/data.service';
import {EmpCheckinService} from '../../../_services/data/empCheckin.service';
import {TabDirective} from 'ngx-bootstrap/tabs';
import {TableName} from '../../../_models/constants/tableName';
import {UserService} from '../../../_services/data/user.service';

@Component({
  selector: 'app-select-region',
  templateUrl: './select-region.component.html',
  styleUrls: ['./select-region.component.css']
})
export class SelectRegionComponent implements OnInit, OnChanges {
  @Input() showSelectRegionComponent: boolean;
  @Input() rightToEditAndShow = true;
  @Input() isShowAll: boolean;
  @Input() searchTarget: boolean;
  @Input() inputTable: string;
  @Input() isShowEmp: boolean;
  @Input() isShowBlock = true;
  @Input() multipleChoice: boolean;
  @Input() maxItems: number;
  @Input() classSelectRegion: boolean;

  tableName = TableName;
  regionTable = this.tableName.regionTb;
  searchItem: any;
  selectItem = {
    region: [],
    team_name: [],
    block_name: [],
    MBN_account_name: [],
  };
  rightUserResult: any;
  rightUserRegion = [];
  @Output() messageEvent = new EventEmitter<any>();
  @Output() teamEvent = new EventEmitter<any>();
  isDisabled = true;
  public allZone = [];
  public allDoiTac = [];
  public allBlock = [];
  public allEmp = [];
  allValueDoitac = [];
  allValueBlock = [];

  constructor(private router: Router,
              private modalService: NgbModal,
              private dataService: DataService,
              private empCheckinService: EmpCheckinService,
              private userService: UserService) {

    // dataService.setOption('searchDiemdanh', this.searchItem);
    // this.isUserRight();
    this.getZone();
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }

  sendMessage(e) {
    console.log(e[0]);
    if (this.multipleChoice === true) {
      if (this.selectItem.MBN_account_name.length > 0) {
        this.searchItem = {MBN_account_name: this.selectItem.MBN_account_name};
      }
      if (this.selectItem.MBN_account_name.length <= 0 && this.selectItem.block_name.length > 0) {
        this.searchItem = {block_name: e};
      }
      if (this.selectItem.block_name.length <= 0 && this.selectItem.team_name.length > 0) {
        if (e[0] !== 'all'){
          this.searchItem = {team_name: e};
          this.teamEvent.emit({team_name: e});
        } else {
          this.searchItem = {team_name: this.allValueDoitac};
          this.teamEvent.emit({team_name: this.allValueDoitac});
        }
      }
      if (this.selectItem.team_name.length <= 0 && this.selectItem.region.length > 0) {
        this.searchItem = {region: this.selectItem.region};
      }
      if (this.selectItem.region.length <= 0) {
        this.searchItem = {};
      }
    } else {
      this.searchItem = this.selectItem;
    }
    this.messageEvent.emit(this.searchItem);
    console.log(this.searchItem);
  }

  getZone() {
    this.allZone = [];
    const query = {
      query: 'Select region from ' + this.regionTable,
    };
    this.empCheckinService.getAll(query).subscribe((data) => {
        // @ts-ignore
        const array = data.filter(
          (item, i, arr) => arr.findIndex(t => t.region === item.region) === i
        );
        if (this.rightToEditAndShow) {
          if (this.rightUserRegion.length > 0) {
            this.allZone = this.rightUserRegion;
          } else {
            this.allZone = array;
          }
        } else {
          this.allZone = array;
        }
      }
    );
  }

  getDoiTac(event) {
    console.log(event);
    this.allDoiTac = [];
    this.allValueDoitac = [];
    if (this.rightToEditAndShow && typeof (event) === 'string' && !this.rightUserResult.team_name.admin) {
      const array = this.rightUserResult.team_name[event];
      if (array) {
        array.forEach((i) => {
          const obj = {};
          Object.assign(obj, {shortname: i});
          this.allDoiTac.push(obj);
        });
      }
    } else if (this.rightToEditAndShow && this.rightUserRegion.length > 0 && typeof (event) !== 'string') {
      event.forEach((i) => {
        this.rightUserResult.team_name[i].forEach((j) => {
          const obj = {};
          Object.assign(obj, {shortname: j});
          this.allDoiTac.push(obj);
          this.allValueDoitac.push(j);
        });
      });
    } else {
      let queryObj;
      if (typeof (event) === 'string') {
        queryObj = {
          query: 'Select shortname, partner from ' + this.regionTable + ' Where region= \"' + event + '\"'
        };
      } else {
        const condition = this.getCondition(event);
        queryObj = {
          query: 'Select shortname, partner from ' + this.regionTable + ' Where region in (' + condition + ')'
        };
      }
      this.empCheckinService.getAll(queryObj).subscribe((data) => {
        this.allDoiTac = data.filter(
          (item, i, arr) => arr.findIndex(t => t.partner === item.partner) === i
        );
        data.forEach((i) => {
          this.allValueDoitac.push(i.shortname);
        });
      });
    }
  }

  getBlock(event) {
    let queryObj;
    if (typeof (event) === 'string') {
      queryObj = {
        query: 'Select block from ' + this.regionTable + ' Where shortname = ' + '\"' + event + '\"'
      };
    } else {
      let condition;
      if (event[0] !== 'all'){
        condition = this.getCondition(event);
      } else {
        condition = this.getCondition(this.allValueDoitac);
      }
      queryObj = {
        query: 'Select block from ' + this.regionTable + ' Where shortname in ' + '(' + condition + ')'
      };
    }
    this.empCheckinService.getAll(queryObj).subscribe((data) => {
      // @ts-ignore
      this.allBlock = data.filter(
        (item, i, arr) => arr.findIndex(t => t.block === item.block) === i
      );
      data.forEach((i) => {
        this.allValueBlock.push(i.block);
      });
    });
  }

  getAcc(event) {
    let queryObj;
    if (typeof (event) === 'string') {
      queryObj = {
        query: 'Select block from ' + this.regionTable + ' Where shortname = ' + '\"' + event + '\"'
      };
    } else {
      const condition = this.getCondition(event);
      if (this.inputTable) {
        queryObj = {
          query: 'Select MBN_account_name from ' + this.inputTable + ' Where block_name in' + '(' + condition + ')'
        };
      }
    }
    this.empCheckinService.getAll(queryObj).subscribe((data) => {
      // @ts-ignore
      this.allEmp = data.filter(
        (item, i, arr) => arr.findIndex(t => t.MBN_account_name === item.MBN_account_name) === i
      );
    });
  }

  getCondition(event) {
    let condition = '';
    event.forEach((i) => {
      condition = condition + '\"' + i + '\"' + ', ';
    });
    condition = condition.substr(0, condition.length - 2);
    return condition;
  }

  // isUserRight() {
  //   this.userService.getUserRightForRegion().subscribe((res) => {
  //     // @ts-ignore
  //     this.rightUserResult = res.result;
  //     console.log(res);
  //     if (this.rightUserResult.team_name) {
  //       Object.keys(this.rightUserResult.team_name).forEach((key) => {
  //         if (key !== 'admin') {
  //           const obj = {};
  //           Object.assign(obj, {region: key});
  //           this.rightUserRegion.push(obj);
  //         }
  //       });
  //     }
  //   });
  // }
}
