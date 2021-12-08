import React,{useContext,useState, useEffect} from 'react';

// Import firebase para usar la libreria de timestamp
import firebase from 'firebase/app';
import '@firebase/firestore';

//Librerias
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//Components
import NotExists from '../NotExists/NotExists';

//Firestore
import { getFirestore } from '../../firebase/firebaseConfig';

//Context
import {CartContext} from '../../context/cartContext';

//History
import { useHistory } from "react-router-dom";

//Hook-Form
import { useForm } from 'react-hook-form';

//Css particular
import './BuyingForm.css';
//CSS core de Materialize
import 'materialize-css/dist/css/materialize.min.css';


const BuyingForm = () => {

    const { cart, setCart, total, orderIds, setOrderIds, itemsInLocal } = useContext(CartContext);

    const { register, handleSubmit, watch, errors } = useForm();
    const email = watch("email");
    const confirmEmail = watch("confirmEmail");

    const [passErr, setPassErr] = useState(false);
 
    const [ error, setError ] = useState(false);
    
    const [loading, setLoading] = useState(false);
    //Este state controla que se haya generado una id de compra
    const [newId, setNewId] = useState();

    const[noDeliver, setNoDeliver]=useState(false)

    let history = useHistory();

    //Si el carrito no esta vacio entonces mando notificacion motivacional
    //De lo contrario redirigo al usuario a la home page
    
    useEffect(() =>{
        if (cart.length !== 0){
            motivationNotif()
        } 
          
    }, [cart,history]);

    /* ===================================== selects ======================= */

    const [selectState, setSelectState] = useState([]);

    const handleSelect = (e) => {
      setSelectState(e.target.value);
    }

    const [selectCity, setSelectCity] = useState([]);

    const handleSelectCity = (e) => {
      setSelectCity(e.target.value);
    }

    const motivationNotif = () => {toast('Estas a solo un paso!! Completa los datos por favor', {
        position: "bottom-left",
        autoClose: 7500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })};
    const purchaseNotif = () => {toast('Compra Realizada con exito!! ', {
        position: "bottom-left",
        autoClose: 7500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })};
    toast.configure();
    
    //Funcion para actualizr los stocks en firestore de los productos recien comprados
    const updateStocks = () => {

        const db = getFirestore()
        const itemCollection =  db.collection('items');
        const bache = db.batch()

        cart.forEach( item => {
            bache.update(itemCollection.doc(item.id),{stock: item.stock - item.quantity})
        })

        bache
        .commit()
        .then(()=> {
            console.log("Bache ok")
        })
        .catch(e => console.log(e))

    }

    const handleOrder = (data)=> { //==========================================================//

        if (data) {

            let order = 
            {
                buyer: {
                    name:  data.name,
                    phone: data.telephone,
                    email: data.email,
                    adress: data.adress
                },
                items: cart.map(item => ({
                    id: item.id,
                    item: item.item,
                    price: item.price,
                    qty: item.quantity
                })),
                date:  firebase.firestore.Timestamp.fromDate( new Date()) ,
                total: total,
                entregado: false,
                deliver:'',
                noDeliver:noDeliver,
                city:selectCity,
                sucursal:selectState
            };

            setLoading(true);
            localStorage.removeItem('cart');
            setCart( itemsInLocal );
            
            const db = getFirestore();
            const ordersCollection = db.collection("orders");

            ordersCollection
            .add(order)
            .then( ({ id }) =>{
                setOrderIds( [ ...orderIds, { id }] );
                setNewId(id);
            })
            .catch(err => {
                setError(err);
            })
            .finally(()=>{
                updateStocks();
                purchaseNotif();
                newId !== '' && history.push("/my-orders");
            })
        }
    };


    return (

        cart.length === 0  && loading === false ? (

            <NotExists title={"Sigue mirando nuestro productos!!"}/>
        ): (
            
                <div className="buy-form-container">

                <form onSubmit={handleSubmit(handleOrder)} className="form-container" >

                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input 
                            name="name" 
                            id="name" 
                            type="text" 
                            className="validate" 
                            autoComplete="none" 
                            ref={register({
                                required: "Ingresar nombre", minLength: {value:2, message:"Minimo 2 caracteres"}, maxLength: {value:60, message:"Maximo 60 caracteres"}
                            })}
                            />
                        <label htmlFor="name">Nombre</label>
                        { errors.name && <small>{ errors.name.message }</small> }
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">directions</i>
                        <input 
                            name="adress" 
                            id="adress" 
                            type="text" 
                            className="validate" 
                            autoComplete="none" 
                            ref={register({
                                required: "Ingresar direccion", minLength: {value:3, message:"Minimo 3 caracteres"}, maxLength: {value:60, message:"Maximo 60 caracteres"}
                            })}
                        />
                        <label htmlFor="adress">Direccion</label>
                        { errors.lastname && <small>{ errors.lastname.message }</small> }
                    </div>

                    <div className='input-field'>
                        <select className="browser-default city" onChange={handleSelectCity} value={selectCity}>
                            <option value="" disabled selected>Elija su Ciudad</option>
                            <option value="hermosillo">Hermosillo</option>
                            <option value="navojoa">Navojoa</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">phone</i>
                        <input 
                            name="telephone" 
                            id="telephone" 
                            type="tel" 
                            className="validate"
                            autoComplete="none" 
                            ref={register({
                                required: "Ingrese su numero", pattern: {
                                    value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/, message:"Ingrese un numero valido"
                                } 
                            })}
                        />
                        <label htmlFor="telephone">Telefono/Celular</label>
                        { errors.telephone && <small>{ errors.telephone.message }</small> }
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input 
                            name="email" 
                            id="email" 
                            type="email" 
                            className="validate" 
                            autoComplete="none"
                            ref={register({
                                required: "Ingrese un email", pattern:{ 
                                    value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , message: "Ingrese un email valido"
                                } 
                            })} 
                        />
                        <label htmlFor="email">Email</label>
                        { errors.email && <small>{ errors.email.message }</small> }
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input 
                            name="confirmEmail" 
                            id="confirmEmail" 
                            type="email" 
                            className="validate" 
                            autoComplete="none"
                            ref={register({
                                required: "Ingrese un email", pattern:{ 
                                    value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , message: "Ingrese un email valido"
                                } 
                            })} 
                            onBlur = { ()=> confirmEmail !== email ? setPassErr(true) : setPassErr(false)}
                            onChange = { ()=> confirmEmail === email && setPassErr(false) }
                        />
                        <label htmlFor="confirmEmail">Confirmar Email</label>
                        { passErr && <small>{ "Sus emails son diferentes"}</small> }
                    </div>

                    {/* Unica forma de que los autocomplete "none" funcionen fue agregando autoComplete = "none" a todos los inputs
                    y crear un ultimo input innecesario (display: none) con autoComplete='on' */}

                    <div className="input-field" style={{display: 'none'}}>
                        <i className="material-icons prefix">email</i>
                        <input id="asd" type="email" className="validate" autoComplete="on"/>
                        <label htmlFor="asd">Email</label>
                    </div>

                    {/* Fin de input innecesario :D */}

                 

                    <h5 className="total-amount">
                        Subtotal &nbsp; ${ total }
                    </h5>
                    <span></span>
                    {error && <p>{error}</p>}

                    <div className={noDeliver ? 'input-field sel' : 'dn'}>
                        <select className="browser-default sele" onChange={handleSelect} value={selectState}>
                            <option value="" disabled selected>Elija una Sucursal</option>
                            <option value="cseri">Camino del Seri</option>
                            <option value="quiroga">Quiroga</option>
                            <option value="perisur">Perisur</option>
                            <option value="progreso">Progreso</option>
                            <option value="navojoa">Navojoa</option>
                        </select>
                    </div>


                    <div className={noDeliver ? 'noDeliver' : 'noDeliver-false'}
                         onClick={()=>setNoDeliver(!noDeliver)}>
                            {noDeliver ? 'ire por el a la tienda' : 'Recoger en Tienda ?'}
                    </div>

                    {
                        loading ? (
                            <button className="waves-effect btn btn-getOrder ">
                                <div className="loop">
                                    <i className="material-icons">loop</i>
                                </div>
                            </button>
                        ) : (
                            <button disabled={ confirmEmail !== email } type="submit" 
                                    className= "waves-effect btn btn-buy ">
                                Finalizar compra
                            </button>
                        )
                    }

                </form>
               
            </div>
        )


    )
}

export default BuyingForm
