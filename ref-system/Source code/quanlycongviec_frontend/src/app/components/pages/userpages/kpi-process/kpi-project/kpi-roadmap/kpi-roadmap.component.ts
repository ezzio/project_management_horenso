import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as shape from 'd3-shape';
import {Edge, Node, ClusterNode, Layout} from '@swimlane/ngx-graph';
import {Subject} from 'rxjs';
import {dt2, node2, tasks} from '../../../../../../_models/data';
import {TasksService} from '../../../../../../_services/data/tasks.service';

@Component({
  selector: 'app-kpi-roadmap',
  templateUrl: './kpi-roadmap.component.html',
  styleUrls: ['./kpi-roadmap.component.css']
})
export class KpiRoadmapComponent implements OnInit {
  clusters: ClusterNode[];
  layoutSettings = {
    orientation: 'TB',
    edgePadding: 300,
    rankPadding: 200,
    nodePadding: 50,
  };
  @Input() objCurrent: any;
  curve: any = shape.curveBundle.beta(1);
  layout: string | Layout = 'dagre';
  linkList: any;
  nodeList: any;
  hierarchialGraph = {nodes: [], links: []};
  rootList: any;
  rootChosen: any;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
    // this.getTreeRootList();
    // this.showGraph();
    this.getData();
  }
  // getTreeRootList(){
  //   this.tasksService.getTaskLists('root').subscribe((res) => {
  //     console.log(res);
  //     // @ts-ignore
  //     if (res && res.result){
  //       // @ts-ignore
  //       this.rootList = res.result.list_task;
  //     }
  //   });
  // }
  getData(){
    this.rootChosen = this.objCurrent;
    this.findRoot();
  }
  findRoot(){
    this.tasksService.getTreeTask(this.rootChosen.id).subscribe((res) => {
      console.log(res);
      // @ts-ignore
      if (res && res.result){
        // @ts-ignore
        const r = res.result;
        this.nodeList = r.dict_data.tasks;
        this.linkList = r.dict_data.edges;
        this.showGraph();
      }
    });
  }
  showGraph() {
    const a = [];
    this.nodeList.forEach((i) => {
      let obj;
      const dash = 376.8 * (100 - i.completion) / 100;
      const per = i.completion / 100;
      obj = {
        id: i.id,
        label: this.checkLengthTitle(i.title),
        title: i.title,
        weight: i.weight_process,
        owner: i.owner,
        ts: i.ts,
        deadline: i.deadline,
        assigned: i.assigned,
        completion: i.completion,
        p: per,
        dashOffSet: dash,
        color: i.color_check
      };
      a.push(obj);
    });
    console.log(a);
    this.hierarchialGraph.nodes = [...a];
    const b = [];
    this.linkList.forEach((i) => {
      let o;
      o = {source: i.source, target: i.target, label: i.label};
      b.push(o);
    });
    console.log(b);
    this.hierarchialGraph.links = [...b];
    console.log(this.hierarchialGraph);

  }
  checkLengthTitle(str){
    if (str && str.length < 15){
      return str;
    } else {
      const  a = str.substr(0, 15);
      return a + '...';
    }
  }
  open(){
    console.log('124');
  }
}
