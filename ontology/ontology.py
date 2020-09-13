from ontology_init import init
from constants import *


def resolve(params):
    privileges = []
    graph = init()
    for key in params:
        if params[key] == '1':
            if (None, PARAM_NAME, Literal(key)) in graph:
                # todo перебор всех возможных узлов, которым сопоставлен данный параметр запроса
                subj = graph.subjects(predicate=PARAM_NAME, object=Literal(key)).__next__()
                print(subj)
                for obj in graph.objects(subject=subj):
                    if graph.value(obj, NAME):
                        pr_name = str(graph.value(obj, NAME))
                        pr_value = str(graph.value(obj, VALUE))
                        pr_gosuslugi = str(graph.value(obj, GOSUSLUGI_URL))
                        privilege = {'name': pr_name,
                                     'value': pr_value + ' руб./мес.',
                                     'url': pr_gosuslugi}
                        print(privilege)
                        privileges.append(privilege)
    return privileges
