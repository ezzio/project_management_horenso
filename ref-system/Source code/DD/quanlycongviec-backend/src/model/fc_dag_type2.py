import datetime
import json
import random
from collections import deque

import networkx as nx
import graphviz

class emp_info:
    def __init__(self, data=None):
        self.fullname = "NGUYEN Van A"
        self.position = "TPKT"
        self.email = "test@abcd.com"
        self.emp_id = "12132123"
        if data is not None:
            self.fullname = data.get("fullname", "")
            self.position = data.get("position", "")
            self.email = data.get("email", "")
            self.emp_id = data.get("emp_id", "")

    def to_dict(self):
        return {
            "fullname": self.fullname,
            "position": self.position,
            "email": self.email,
            "emp_id": self.emp_id
        }

    def to_json(self):
        return json.dump(self.to_dict(), indent=4,sort_keys=True)

DATETIME_FORMAT4 = '%d/%m/%Y %H:%M:%S'
def datetime_from_str(date_str):
    return datetime.datetime.strptime(date_str, DATETIME_FORMAT4)

def str_from_datetime(date):
    return date.strftime(DATETIME_FORMAT4)


class fc_task:
    def __init__(self, id=0, level=0, task_data=None):
        self.id = id
        self.level = level
        self.owner = emp_info()
        self.assigned = emp_info()
        self.title = 'Task_ABCD'
        self.description = 'This is a task'
        self.status = 'OK'
        self.priority = 'HIGH'
        self.type = ''
        self.ts = datetime_from_str('15/03/2021 10:30:00')
        self.te = datetime_from_str('16/03/2021 09:30:00')
        self.dateline = datetime_from_str('16/03/2021 10:30:00')
        self.t_assigned = datetime_from_str('15/03/2021 10:30:00')
        self.estimated_duration = 2. # hours
        self.quality = 0.
        self.progress = 0.
        self.completion = 15.
        self.weight = 100.
        self.rate = 1.
        self.children = []
        self.children_ptr = []
        self.late = False
        self.problem = {
            'desc': 'abcd',
            'link': 'task_id',
        }
        self.task_data = {}
        if task_data is not None:
            self.task_data = task_data

            self.id = task_data.get("id", 0)
            self.level = task_data.get("level", 0)
            self.owner = emp_info(task_data.get("owner", None))
            self.assigned = emp_info(task_data.get("assigned", None))
            self.title = task_data.get("title", "")
            self.description = task_data.get("description", "")
            self.status = task_data.get("status", "")
            self.priority = task_data.get("priority", "LOW")
            self.type = task_data.get("type", "")
            self.ts = datetime_from_str(task_data.get("ts", ""))
            self.te = datetime_from_str(task_data.get("te", ""))
            self.dateline = datetime_from_str(task_data.get("dateline", ""))
            self.t_assigned = datetime_from_str(task_data.get("t_assigned", ""))
            self.estimated_duration = task_data.get("estimated_duration", 0.01)
            self.quality = task_data.get("quality", 0.)
            self.progress = task_data.get("progress", 0.)
            self.completion = task_data.get("completion", 0.)
            self.weight = task_data.get("weight", 100.)
            self.late = task_data.get("late", False)
            self.problem = task_data.get("problem", {})


    def get_task_data(self):
        self.task_data = {
            'owner': self.owner.to_dict(),
            'assigned': self.assigned.to_dict(),
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'priority': self.priority,
            'type': self.type,
            'problem': self.problem,
            'ts': str_from_datetime(self.ts),
            'te': str_from_datetime(self.te),
            'dateline': str_from_datetime(self.dateline),
            't_assigned': str_from_datetime(self.t_assigned),
            'estimated_duration': self.estimated_duration,
            'id': self.id,
            'quality': self.quality,
            'progress': self.progress,
            'completion': self.completion,
            'weight': self.weight,
            'level': self.level
        }
        return self.task_data

    def to_json(self):
        return json.dump(self.get_task_data(), indent=4, sort_keys=True)

    def add_child(self, child_id, child_ptr=None):
        self.children.append(child_id)
        if child_ptr is not None:
            self.children_ptr.append(child_ptr)

    def get_children(self):
        return self.children

    def get_children_ptr(self):
        return self.children_ptr


def create_simple_task(id, level=0):
    d = fc_task(id=id, level=level)
    return d


def time_progress_cal(t_assigned, dateline, current_date):
    task_duration = dateline - t_assigned
    current_processing_time = current_date - t_assigned
    p = round(current_processing_time / task_duration, 2) * 100
    return p


def work_result_cal(estimated_duration, ts, te):
    task_duration = ts - te
    p = round(task_duration / estimated_duration, 2) * 100
    return p


class fc_dag():
    def __init__(self):
        self.dag = nx.DiGraph()
        self.task_dict = {}
        self.task_level_dict = {}

    def generate_successive(self):

        self.dag = nx.DiGraph()
        root_id = 1234
        self.add_root(root_id, create_simple_task(root_id))

        # level 1
        child11 = 11
        self.add_child(root_id, child11, create_simple_task(child11))

        child12 = 12
        self.add_child(root_id, child12, create_simple_task(child12))

        # level 2
        child21 = 21
        self.add_child(child11, child21, create_simple_task(child21))

        child22 = 22
        self.add_child(child11, child22, create_simple_task(child22))

        child23 = 23
        self.add_child(child12, child23, create_simple_task(child23))

        child24 = 24
        self.add_child(child12, child24, create_simple_task(child24))

        # level 3
        child31 = 31
        self.add_child(child22, child31, create_simple_task(child31))

        child32 = 32
        self.add_child(child22, child32, create_simple_task(child32))

        child33 = 33
        self.add_child(child23, child33, create_simple_task(child33))

        child34 = 34
        self.add_child(child23, child34, create_simple_task(child34))

        # level 4
        child41 = 41
        self.add_child(child32, child41, create_simple_task(child41))

        # self.view_graph()

        return self.dag

    def view_graph(self):
        d = graphviz.Digraph("Simple")
        for id in self.task_dict.keys():
            c = self.get_completion(id)
            name = "{}".format(id)
            label = "T{}\n{}%".format(id,c)
            d.node(name, label)

        edges = self.dag.edges()
        for e in edges:
            parent_id = e[0]
            child_id = e[1]
            tail_name = "{}".format(parent_id)
            head_name = "{}".format(child_id)
            w = self.get_weight(child_id)
            label = "{}".format(w)
            d.edge(tail_name, head_name, label)
        d.view()

    def add_root(self, id, task = None):
        if not task:
            self.dag.add_node(id)
            self.task_dict[id] = task
        else:
            self.dag.add_node(id)
            self.task_dict[id] = create_simple_task(id)
        self.task_level_dict[id] = 0

    def add_child(self, parent_id, child_id, child_task):
        # add node to the predecessor node
        if not self.dag.has_predecessor(parent_id, child_id):
            self.dag.add_node(child_id)
            self.dag.add_edge(parent_id, child_id)
            self.task_level_dict[child_id] = self.task_level_dict[parent_id] + 1
            self.task_dict[child_id] = child_task

    def find_root_id(self):
        # root of DAG is the node doesn't have predecessor
        root_list = []
        root_id = -1
        for node in self.dag.nodes():
            p = self.dag.predecessors(node)
            if not next(p, None):
                root_list.append(node)
        if len(root_list) == 0:
            print("ERROR: no root found")
        elif len(root_list) > 1:
            print("ERROR: DAG cannot have more than one root")
        else:
            root_id = root_list[0]

        return root_id

    def find_leaves(self):
        leave_list = []
        for node in self.dag.nodes():
            s = self.dag.successors(node)
            if not next(s, None):
                leave_list.append(node)

        return leave_list

    def bfs_level_cal(self, source):
        G = self.dag
        neighbors = G.neighbors
        visited = {source}
        queue = deque([(source, neighbors(source))])
        self.task_level_dict = {source:0}
        while queue:
            parent, children = queue[0] # start with source and its neighbors
            try:
                child = next(children)
                if child not in visited:
                    self.task_level_dict[child] = self.task_level_dict[parent] + 1
                    visited.add(child)
                    queue.append((child, neighbors(child)))
            except StopIteration:
                queue.popleft()
        return self.task_level_dict

    def dfs_level_cal(self, source):
        G = self.dag
        nodes = [source]
        visited = set()
        self.task_level_dict = {source:0}
        for start in nodes:
            if start in visited:
                continue
            visited.add(start)
            stack = [(start, iter(G[start]))]
            while stack:
                parent, children = stack[-1]
                try:
                    child = next(children)
                    if child not in visited:
                        self.task_level_dict[child] = self.task_level_dict[parent] + 1
                        visited.add(child)
                        stack.append((child, iter(G[child])))
                except StopIteration:
                    stack.pop()
        return self.task_level_dict

    def get_level_max(self):
        self.bfs_level_cal(self.find_root_id())
        l = max(self.task_level_dict.values())
        return l

    def completion_cal(self):
        # update completion of child task backward to all it's parents tasks
        # completion of task is the mean of all children's completion
        lm = self.get_level_max()
        for i in range(0,lm+1):
            l = lm - i
            print("level {}".format(l))
            for tid in self.task_level_dict:
                if l == self.task_level_dict[tid]:
                    p = 0.
                    w = 0.
                    ss = self.dag.successors(tid)
                    cnt = 0
                    for s in ss:
                        t = self.get_task_fr_id(s)
                        if t.weight < 10:
                            t.weight = 10
                        w = w + t.weight
                        cnt = cnt+1

                    ss = self.dag.successors(tid)
                    for s in ss:
                        t = self.get_task_fr_id(s)
                        t.weight = round(t.weight/w, 2)
                        p = p + t.completion*t.weight
                    if cnt > 0:
                        p = round(p, 2)
                        self.set_completion(tid, p)

                    print("tid {} completion: {}".format(tid, self.get_completion(tid)))

    def get_completion(self, tid):
        task = self.get_task_fr_id(tid) #type:fc_task
        return task.completion

    def set_completion(self, tid, p):
        task = self.get_task_fr_id(tid)  # type:fc_task
        task.completion = p

    def get_weight(self, tid):
        task = self.get_task_fr_id(tid) #type:fc_task
        return task.weight

    def set_weight(self, tid, w):
        task = self.get_task_fr_id(tid)  # type:fc_task
        if w < 10:
            w = 10
        task.weight = w

    def get_task_fr_id(self, task_id): #type: (int) -> fc_task
        return self.task_dict[task_id]

    def get_all_successors_fr(self, source):
        s = list(nx.bfs_successors(self.dag, source).values())
        if source in s:
            s.remove(source)
        return s

    def get_all_predecessors_fr(self, source):
        return nx.bfs_predecessors(self.dag, source)

    def get_longest_path(self):
        p = nx.dag_longest_path(self.dag)
        return p

    def dump_to_json(self, filename):
        # Add parent-child relationships
        edges_list = []
        i = 0
        for edge in self.dag.edges():
            e = {
                'id': i,
                'source': str(edge[0]),
                'target': str(edge[1])
            }
            edges_list.append(e)
            i = i +1

        nodes_list = []
        for node in self.task_dict.keys():
            nodes_list.append(self.task_dict[node].get_task_data())

        # print(nodes_list)
        _dag = {
            "edges": edges_list,
            "tasks": nodes_list
        }
        _dag_json = json.dumps(_dag, indent=4,sort_keys=True)

        with open(filename, 'w+') as f:
            f.write(_dag_json)
        # print(_dag_json)

    def load_from_json(self, filename):
        self.dag = nx.DiGraph()
        with open(filename) as json_file:
            d = json.load(json_file)
            if "edges" in d:
                edges_list = d["edges"]
                for e in edges_list:
                    u = int(e['source'])
                    v = int(e['target'])
                    self.dag.add_edge(u,v)

            if "tasks" in d:
                _nodes = d["tasks"]
                for node in _nodes:
                    nid = node['id']
                    self.dag.add_node(nid)
                    self.task_dict[nid] = fc_task(task_data=node)
        return self.dag

    def load_from_db(self):
        print("Load From DB here")

    def dumps_to_db(self):
        print("Dump to DB here")


if __name__ == '__main__':

    f = fc_dag()
    f.generate_successive()
    f.dump_to_json("graph.json")
    f.load_from_json("graph.json")

    f.dump_to_json("graph2.json")
    f.set_completion(41, 100)
    f.set_weight(31, 60)
    f.completion_cal()
    f.view_graph()
    print(f.find_leaves())
