#!/usr/bin/env python3

import requests
from os import environ as env


class CovidAPI():
  """
  CovidAPI

  Wrapper para la API de Hackfun Rosario.
  """
  def __init__(self, url="https://covidapi.hackfunrosario.com/api/", admin_key=None):
    self.url = url
    self.admin_key = (admin_key or env.get('ADMINKEY'))
    self.token = None
    self.page_number = 0


  ## Métodos de HTTP
  def get(self, path, data = None, headers = None):
    '''
    Hacemos un request HTTP usando GET

    path: path relativo de la URI

    data: dict()
    headers: dict()
    '''
    r = requests.get(self.url+path, params = data, headers = headers)
    self.page_number = 0 # reset page
    
    return r.json()


  def post(self, path, data = None, headers = None):
    r = requests.post(self.url+path, data = data, headers = headers)
    return r.json()
  

  def check_success(self, res):
    '''
    Chequeamos el resultado del request. El valor procesado es el que devuelve la API.

    res: Respuesta de self.get o self.post
    '''
    if not res.get('success'):
      print("Error:", res.get('error'))


  def page(self, n):
    '''
    Paginación
    '''
    try:
      self.page_number = abs(int(n))
    except:
      self.page_number = 0

    return self


  ## Autenticación
  def signIn(self, usr, pwd):
    # make request
    r = self.post('auth/signIn', data = { 'username': usr, 'password': pwd })
    self.check_success(r)

    # guardamos el token de sesión si existe
    self.token = r.get('token')

    return self


  def signOut(self):
    # Eliminamos el token de sesión
    self.token = None

    return self


  def registerUser(self, usr, pwd, email, name, admin=False):
    # data de user a crear
    d = {
      'username': usr,
      'password': pwd,
      'email': email,
      'name': name,
      'admin': bool(admin)
    }

    # admin key: requerida. sólo para administradorxs
    h = { "admin-key": self.admin_key }

    # make request
    r = self.post('auth/registerUser', data = d, headers = h)
    self.check_success(r)

    return self


  ## Métodos de Stats
  def stats(self, data=None):
    """
    stats

    Sin parámetros: levanta todos los documentos en la API
    Con parámetros: crea la nueva entrada (si estamos logueadxs) con los valores recibidos
    data = {
      fecha: string 'yyyy-mm-dd',
      provincia: string,
      departamento: String,
      confirmados: int,
      muertes: int,
      recuperados: int,
      tests: int,
      tests_negativos: int,
      tipo_transmision: string,
    }
    """
    if data:
      # post data: creamos el método
      r = self.post('stats', data = data, headers = { 'Authorization': f"Bearer {self.token}" })
    else:
      # get data: sólo levantamos la data existente
      r = self.get(f'stats/{self.page_number}')

    return r

  # filtros
  def getStatByProvincia(self, province):
    """
    province: string
    """
    return self.get(f'getStatByProvincia/{province}/{self.page_number}')


  def getStatByFecha(self, date):
    """
    data: string en formato "YYYY-MM-YY"
    ej.: '2020-03-09'
    """
    return self.get(f'getStatByFecha/{date}/{self.page_number}')


  def totals(self):
    """
    Devuelve el total de datos acumulados
    """
    return self.get(f'totals')


  def totalsByProvincia(self, province):
    """
    Devuelve el total de datos acumulados por provincia
    """
    return self.get(f'totalsByProvincia/{province}')


  def totalsByFecha(self, until, since=None):
    """
    Devuelve el total de datos acumulados cada día hasta la fecha indicada
    since: fecha de inicio
    until: fecha de final
    """
    if since:
      return self.get(f'totalsByFecha/{since}/{until}')
    
    return self.get(f'totalsByFecha/{until}')
    
