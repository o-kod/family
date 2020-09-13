from rdflib import URIRef, Literal
from rdflib import Graph
from constants import *


def init():
    g = Graph()

    retired = URIRef(u'http://opencode.su/socio/retired')
    edv_transport = URIRef(u'http://opencode.su/socio/edv_transport')
    pension = URIRef(u'http://opencode.su/socio/pension')

    veteran = URIRef(u'http://opencode.su/socio/veteran')
    edv = URIRef(u'http://opencode.su/socio/edv')
    zhku_compensation = URIRef(u'http://opencode.su/socio/zhku_compensation')
    pension_veteran = URIRef(u'http://opencode.su/socio/pension_veteran')

    pension_name = Literal(u'Пенсия (семья с родителем-пенсионером)')
    edv_transport_name = Literal(u'ЕДВ на проезд (семья с родителем-пенсионером)')
    edv_veteran_name = Literal(u'Ежемесячная денежная выплата (семья с ветераном труда РФ)')
    pension_veteran_name = Literal(u'Пенсия (семья с ветераном труда РФ)')
    zhku_compensation_name = Literal(u'Компенсация на оплату ЖКУ (семья с ветераном труда РФ)')
    pension_value = Literal(15594)
    edv_transport_value = Literal(270)
    edv_veteran_value = Literal(713)
    pension_veteran_value = Literal(15594)
    zhku_compensation_value = Literal(853)
    pension_gosuslugi = Literal(u'https://www.gosuslugi.ru/situation/disabled_person/disabled_disabled')
    edv_transport_gosuslugi = Literal(u'https://www.gosuslugi.ru/situation/social_assistance/monthly_payments')
    edv_veteran_gosuslugi = Literal(u'https://www.gosuslugi.ru/111447/2/info')
    zhku_compensation_gosuslugi = Literal(u'https://www.gosuslugi.ru/72091/1/info')
    pension_veteran_gosuslugi = Literal('')

    veteran_param_name = Literal(u'is_veteran')
    retired_param_name = Literal(u'is_retired')

    """Добавление узлов для сущностей типа Жизненная ситуация"""
    g.add((veteran, PARAM_NAME, veteran_param_name))
    g.add((retired, PARAM_NAME, retired_param_name))

    """Добавление узлов для сущностей типа Льгота для ветеранов"""
    g.add((veteran, HAS_PRIVILEGE, edv))
    g.add((veteran, HAS_PRIVILEGE, pension_veteran))
    g.add((veteran, HAS_PRIVILEGE, zhku_compensation))

    g.add((edv, VALUE, edv_veteran_value))
    g.add((zhku_compensation, VALUE, zhku_compensation_value))
    g.add((pension_veteran, VALUE, pension_veteran_value))
    g.add((edv, NAME, edv_veteran_name))
    g.add((zhku_compensation, NAME, zhku_compensation_name))
    g.add((pension_veteran, NAME, pension_veteran_name))
    g.add((edv, GOSUSLUGI_URL, edv_veteran_gosuslugi))
    g.add((zhku_compensation, GOSUSLUGI_URL, zhku_compensation_gosuslugi))
    g.add((pension_veteran, GOSUSLUGI_URL, pension_veteran_gosuslugi))

    """Добавление узлов для сущностей типа Льгота для пенсионеров"""
    g.add((retired, HAS_PRIVILEGE, pension))
    g.add((retired, HAS_PRIVILEGE, edv_transport))

    g.add((pension, VALUE, pension_value))
    g.add((pension, NAME, pension_name))
    g.add((pension, GOSUSLUGI_URL, pension_gosuslugi))
    g.add((edv_transport, NAME, edv_transport_name))
    g.add((edv_transport, VALUE, edv_transport_value))
    g.add((edv_transport, GOSUSLUGI_URL, edv_transport_gosuslugi))
    return g
