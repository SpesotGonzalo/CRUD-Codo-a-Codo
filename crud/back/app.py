from flask import Flask ,jsonify ,request
from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS=app

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/crudFinal'
app.config['SQLALCHEMY_TRACK_MODIFCATIONS']=False

db = SQLAlchemy(app)

ma = Marshmallow(app)

#BBDD

class Auto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(25))
    modelo = db.Column(db.String(25))
    precio = db.Column(db.Float())
    stock =db.Column(db.Integer)
    imagen = db.Column(db.String(400))
    color =db.Column(db.String(10))

    def __init__(self,marca,modelo,stock,imagen,color,precio):
        self.marca= marca
        self.modelo = modelo
        self.precio= precio
        self.stock = stock 
        self.imagen = imagen
        self.color = color
       

#Resto de las Tablas


with app.app_context():
    db.create_all()  #Crea la tabla 


class AutoSchema(ma.Schema):
    class Meta:
        fields=('id','marca','modelo','stock','imagen','color','precio')


auto_schema=AutoSchema()            # El objeto auto_schema es para traer un producto
autos_schema=AutoSchema(many=True)  # El objeto autos_schema es para traer multiples registros de producto


@app.route('/autos', methods=['GET'])
def get_auto():
    autos = Auto.query.all()
    resultado = autos_schema.dump(autos)
    return jsonify(resultado)



@app.route('/autos/<id>',methods=['GET'])
def get_auto(id):
    auto=Auto.query.get(id)
    return auto_schema.jsonify(auto)   # retorna el JSON de un auto recibido como parametro


@app.route('/autos/<id>',methods=['DELETE'])
def delete_auto(id):

    auto=Auto.query.get(id)
    db.session.delete(auto)
    db.session.commit()
    return auto_schema.jsonify(auto)


@app.route('/autos', methods=['POST'])
def create_auto():
      marca = request.json['marca'] 
      modelo = request.json['modelo']
      stock = request.json['stock']
      imagen = request.json['imagen']
      color = request.json['color']
      precio = request.json['precio']

      nuevo_auto =Auto(marca,modelo,stock,imagen,color,precio)
      db.session.add(nuevo_auto)
      db.session.commit()
      return auto_schema.jsonify(nuevo_auto)


@app.route('/autos/<id>', methods=['PUT'])

def update_auto(id):
    auto = Auto.query.get(id)

    marca = request.json['marca'] 
    modelo = request.json['modelo']
    stock = request.json['stock']
    imagen = request.json['imagen']
    color = request.json['color']
    precio = request.json['precio']

    auto.marca = marca
    auto.modelo = modelo
    auto.stock = stock
    auto.imagen = imagen
    auto.color = color
    auto.precio = precio

    db.session.commit()
    return auto_schema.jsonify(auto)


if __name__ == '__main__' : 
    app.run(debug=True, port=5000)

    
