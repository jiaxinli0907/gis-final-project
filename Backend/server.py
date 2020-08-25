# flask imports, CORS will be important next week (install using: pip install -U flask-cors)
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

# general python imports
import json

# psycopg2 imports
import psycopg2
import psycopg2.extras

# constants, check whether to use localhost or gis-database as the URL depending if its running in Docker 
IN_DOCKER = True
DB_HOST = "gis-database" if IN_DOCKER else "localhost"
DB_PORT = "5432" if IN_DOCKER else "15432"
DB_USER = "gis_user"
DB_PASS = "gis_pass"
DB_NAME = "gis"

# we've imported flask, we still need to create an instance. __name__ is a built-in variable which evaluates 
# to the name of the current module. Thus it can be used to check whether the current script is being run on 
# its own or being imported somewhere else by combining it with if statement, as shown below.
app = Flask(__name__)
# extend flask with CORS, will be necessary next week
CORS(app)

@app.route('/api/data/forestmap', methods=["POST"])
def forestmap():

    query = """
    select f.name as name, f.code, 
    f.y1990 as y1990, f.y1995 as y1995, f.y2000 as y2000,f.y2005 as y2005,f.y2010 as y2010,f.y2015 as y2015, 
    g.y1990 as g1990, g.y1995 as g1995, g.y2000 as g2000, g.y2005 as g2005, g.y2010 as g2010, g.y2015 as g2015, 
    e.y1990 as e1990, e.y1995 as e1995, e.y2000 as e2000, e.y2005 as e2005, e.y2010 as e2010, e.y2015 as e2015, 
    co.y1990 as co1990, co.y1995 as co1995, co.y2000 as co2000, co.y2005 as co2005, co.y2010 as co2010, co.y2015 as co2015, 
    p.y1990 as p1990, p.y1995 as p1995, p.y2000 as p2000, p.y2005 as p2005, p.y2010 as p2010, p.y2015 as p2015, 
    st_asgeojson(geom) as geojson 
    from forest f, countries c, gdppercapita g, education e, co2_emissions co, population p
    where f.code = c.iso3 and f.code = e.code and  f.code = g.code and  f.code = co.code and  f.code = p.code
    """
#  select f.name as name, code, y1990, y1995, y2000,y2005,y2010,y2015, st_asgeojson(geom) as geojson 
#         from forest as f, countries as c
#         where code = c.iso3

    with psycopg2.connect(host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASS, dbname=DB_NAME) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.NamedTupleCursor) as cur:
            cur.execute(query)
            records = cur.fetchall()

    features = []
    for r in records:
        feature = {
            "type": 'Feature',
            "geometry": json.loads(r.geojson),
            # careful! r.geojson is of type str, we must convert it to a dictionary
            "properties": {
                "name":r.name,
                "code":r.code,
                "y1990":float(r.y1990 or 0),
                "y1995":float(r.y1995 or 0),
                "y2000":float(r.y2000 or 0),
                "y2005":float(r.y2005 or 0),
                "y2010":float(r.y2010 or 0),
                "y2015":float(r.y2015 or 0),
                "g1990":float(r.g1990 or 0),
                "g1995":float(r.g1995 or 0),
                "g2000":float(r.g2000 or 0),
                "g2005":float(r.g2005 or 0),
                "g2010":float(r.g2010 or 0),
                "g2015":float(r.g2015 or 0),
                "e1990":float(r.e1990 or 0),
                "e1995":float(r.e1995 or 0),
                "e2000":float(r.e2000 or 0),
                "e2005":float(r.e2005 or 0),
                "e2010":float(r.e2010 or 0),
                "e2015":float(r.e2015 or 0),
                "co1990":float(r.co1990 or 0),
                "co1995":float(r.co1995 or 0),
                "co2000":float(r.co2000 or 0),
                "co2005":float(r.co2005 or 0),
                "co2010":float(r.co2010 or 0),
                "co2015":float(r.co2015 or 0),
                "p1990":float(r.p1990 or 0),
                "p1995":float(r.p1995 or 0),
                "p2000":float(r.p2000 or 0),
                "p2005":float(r.p2005 or 0),
                "p2010":float(r.p2010 or 0),
                "p2015":float(r.p2015 or 0),
        
            }
            
        }

        features.append(feature)




    featurecollection = {
        "type": "FeatureCollection",
        "features": features
    }


    resp = Response(response=json.dumps(featurecollection),
                    status=200,
                    mimetype="application/json")
    return(resp)
    

@app.route('/api/data/highgdp', methods=["POST"])
def highgdp():

    query = """
    select f.name as name, f.code, 
    f.y1990 as y1990, f.y1995 as y1995, f.y2000 as y2000,f.y2005 as y2005,f.y2010 as y2010,f.y2015 as y2015, 
    g.y1990 as g1990, g.y1995 as g1995, g.y2000 as g2000, g.y2005 as g2005, g.y2010 as g2010, g.y2015 as g2015, 
    e.y1990 as e1990, e.y1995 as e1995, e.y2000 as e2000, e.y2005 as e2005, e.y2010 as e2010, e.y2015 as e2015, 
    co.y1990 as co1990, co.y1995 as co1995, co.y2000 as co2000, co.y2005 as co2005, co.y2010 as co2010, co.y2015 as co2015, 
    p.y1990 as p1990, p.y1995 as p1995, p.y2000 as p2000, p.y2005 as p2005, p.y2010 as p2010, p.y2015 as p2015, 
    st_asgeojson(geom) as geojson 
    from forest f, countries c, gdppercapita g, education e, co2_emissions co, population p
    where f.code = c.iso3 and f.code = e.code and  f.code = g.code and  f.code = co.code and  f.code = p.code and g.y2015 > (select avg(y2015) from gdppercapita)
    """
#  select f.name as name, code, y1990, y1995, y2000,y2005,y2010,y2015, st_asgeojson(geom) as geojson 
#         from forest as f, countries as c
#         where code = c.iso3

    with psycopg2.connect(host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASS, dbname=DB_NAME) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.NamedTupleCursor) as cur:
            cur.execute(query)
            records = cur.fetchall()

    features = []
    for r in records:
        feature = {
            "type": 'Feature',
            "geometry": json.loads(r.geojson),
            # careful! r.geojson is of type str, we must convert it to a dictionary
            "properties": {
                "name":r.name,
                "code":r.code,
                "y1990":float(r.y1990 or 0),
                "y1995":float(r.y1995 or 0),
                "y2000":float(r.y2000 or 0),
                "y2005":float(r.y2005 or 0),
                "y2010":float(r.y2010 or 0),
                "y2015":float(r.y2015 or 0),
                "g1990":float(r.g1990 or 0),
                "g1995":float(r.g1995 or 0),
                "g2000":float(r.g2000 or 0),
                "g2005":float(r.g2005 or 0),
                "g2010":float(r.g2010 or 0),
                "g2015":float(r.g2015 or 0),
                "e1990":float(r.e1990 or 0),
                "e1995":float(r.e1995 or 0),
                "e2000":float(r.e2000 or 0),
                "e2005":float(r.e2005 or 0),
                "e2010":float(r.e2010 or 0),
                "e2015":float(r.e2015 or 0),
                "co1990":float(r.co1990 or 0),
                "co1995":float(r.co1995 or 0),
                "co2000":float(r.co2000 or 0),
                "co2005":float(r.co2005 or 0),
                "co2010":float(r.co2010 or 0),
                "co2015":float(r.co2015 or 0),
                "p1990":float(r.p1990 or 0),
                "p1995":float(r.p1995 or 0),
                "p2000":float(r.p2000 or 0),
                "p2005":float(r.p2005 or 0),
                "p2010":float(r.p2010 or 0),
                "p2015":float(r.p2015 or 0),
        
            }
            
        }

        features.append(feature)




    featurecollection = {
        "type": "FeatureCollection",
        "features": features
    }


    resp = Response(response=json.dumps(featurecollection),
                    status=200,
                    mimetype="application/json")
    return(resp)

@app.route('/api/data/lowgdp', methods=["POST"])
def lowgdp():

    query = """
    select f.name as name, f.code, 
    f.y1990 as y1990, f.y1995 as y1995, f.y2000 as y2000,f.y2005 as y2005,f.y2010 as y2010,f.y2015 as y2015, 
    g.y1990 as g1990, g.y1995 as g1995, g.y2000 as g2000, g.y2005 as g2005, g.y2010 as g2010, g.y2015 as g2015, 
    e.y1990 as e1990, e.y1995 as e1995, e.y2000 as e2000, e.y2005 as e2005, e.y2010 as e2010, e.y2015 as e2015, 
    co.y1990 as co1990, co.y1995 as co1995, co.y2000 as co2000, co.y2005 as co2005, co.y2010 as co2010, co.y2015 as co2015, 
    p.y1990 as p1990, p.y1995 as p1995, p.y2000 as p2000, p.y2005 as p2005, p.y2010 as p2010, p.y2015 as p2015, 
    st_asgeojson(geom) as geojson 
    from forest f, countries c, gdppercapita g, education e, co2_emissions co, population p
    where f.code = c.iso3 and f.code = e.code and  f.code = g.code and  f.code = co.code and  f.code = p.code and g.y2015 < (select avg(y2015) from gdppercapita)
    """
#  select f.name as name, code, y1990, y1995, y2000,y2005,y2010,y2015, st_asgeojson(geom) as geojson 
#         from forest as f, countries as c
#         where code = c.iso3

    with psycopg2.connect(host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASS, dbname=DB_NAME) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.NamedTupleCursor) as cur:
            cur.execute(query)
            records = cur.fetchall()

    features = []
    for r in records:
        feature = {
            "type": 'Feature',
            "geometry": json.loads(r.geojson),
            # careful! r.geojson is of type str, we must convert it to a dictionary
            "properties": {
                "name":r.name,
                "code":r.code,
                "y1990":float(r.y1990 or 0),
                "y1995":float(r.y1995 or 0),
                "y2000":float(r.y2000 or 0),
                "y2005":float(r.y2005 or 0),
                "y2010":float(r.y2010 or 0),
                "y2015":float(r.y2015 or 0),
                "g1990":float(r.g1990 or 0),
                "g1995":float(r.g1995 or 0),
                "g2000":float(r.g2000 or 0),
                "g2005":float(r.g2005 or 0),
                "g2010":float(r.g2010 or 0),
                "g2015":float(r.g2015 or 0),
                "e1990":float(r.e1990 or 0),
                "e1995":float(r.e1995 or 0),
                "e2000":float(r.e2000 or 0),
                "e2005":float(r.e2005 or 0),
                "e2010":float(r.e2010 or 0),
                "e2015":float(r.e2015 or 0),
                "co1990":float(r.co1990 or 0),
                "co1995":float(r.co1995 or 0),
                "co2000":float(r.co2000 or 0),
                "co2005":float(r.co2005 or 0),
                "co2010":float(r.co2010 or 0),
                "co2015":float(r.co2015 or 0),
                "p1990":float(r.p1990 or 0),
                "p1995":float(r.p1995 or 0),
                "p2000":float(r.p2000 or 0),
                "p2005":float(r.p2005 or 0),
                "p2010":float(r.p2010 or 0),
                "p2015":float(r.p2015 or 0),
        
            }
            
        }

        features.append(feature)




    featurecollection = {
        "type": "FeatureCollection",
        "features": features
    }


    resp = Response(response=json.dumps(featurecollection),
                    status=200,
                    mimetype="application/json")
    return(resp)

@app.route('/api/data/highpop', methods=["POST"])
def highpop():

    query = """
    select f.name as name, f.code, 
    f.y1990 as y1990, f.y1995 as y1995, f.y2000 as y2000,f.y2005 as y2005,f.y2010 as y2010,f.y2015 as y2015, 
    g.y1990 as g1990, g.y1995 as g1995, g.y2000 as g2000, g.y2005 as g2005, g.y2010 as g2010, g.y2015 as g2015, 
    e.y1990 as e1990, e.y1995 as e1995, e.y2000 as e2000, e.y2005 as e2005, e.y2010 as e2010, e.y2015 as e2015, 
    co.y1990 as co1990, co.y1995 as co1995, co.y2000 as co2000, co.y2005 as co2005, co.y2010 as co2010, co.y2015 as co2015, 
    p.y1990 as p1990, p.y1995 as p1995, p.y2000 as p2000, p.y2005 as p2005, p.y2010 as p2010, p.y2015 as p2015, 
    st_asgeojson(geom) as geojson 
    from forest f, countries c, gdppercapita g, education e, co2_emissions co, population p
    where f.code = c.iso3 and f.code = e.code and  f.code = g.code and  f.code = co.code and  f.code = p.code and p.y2015 > 100000000
    """
#  select f.name as name, code, y1990, y1995, y2000,y2005,y2010,y2015, st_asgeojson(geom) as geojson 
#         from forest as f, countries as c
#         where code = c.iso3

    with psycopg2.connect(host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASS, dbname=DB_NAME) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.NamedTupleCursor) as cur:
            cur.execute(query)
            records = cur.fetchall()

    features = []
    for r in records:
        feature = {
            "type": 'Feature',
            "geometry": json.loads(r.geojson),
            # careful! r.geojson is of type str, we must convert it to a dictionary
            "properties": {
                "name":r.name,
                "code":r.code,
                "y1990":float(r.y1990 or 0),
                "y1995":float(r.y1995 or 0),
                "y2000":float(r.y2000 or 0),
                "y2005":float(r.y2005 or 0),
                "y2010":float(r.y2010 or 0),
                "y2015":float(r.y2015 or 0),
                "g1990":float(r.g1990 or 0),
                "g1995":float(r.g1995 or 0),
                "g2000":float(r.g2000 or 0),
                "g2005":float(r.g2005 or 0),
                "g2010":float(r.g2010 or 0),
                "g2015":float(r.g2015 or 0),
                "e1990":float(r.e1990 or 0),
                "e1995":float(r.e1995 or 0),
                "e2000":float(r.e2000 or 0),
                "e2005":float(r.e2005 or 0),
                "e2010":float(r.e2010 or 0),
                "e2015":float(r.e2015 or 0),
                "co1990":float(r.co1990 or 0),
                "co1995":float(r.co1995 or 0),
                "co2000":float(r.co2000 or 0),
                "co2005":float(r.co2005 or 0),
                "co2010":float(r.co2010 or 0),
                "co2015":float(r.co2015 or 0),
                "p1990":float(r.p1990 or 0),
                "p1995":float(r.p1995 or 0),
                "p2000":float(r.p2000 or 0),
                "p2005":float(r.p2005 or 0),
                "p2010":float(r.p2010 or 0),
                "p2015":float(r.p2015 or 0),
        
            }
            
        }

        features.append(feature)




    featurecollection = {
        "type": "FeatureCollection",
        "features": features
    }


    resp = Response(response=json.dumps(featurecollection),
                    status=200,
                    mimetype="application/json")
    return(resp)
