import './style.css';
import api from '../../../services/api';
import { useEffect , useState, useRef} from 'react';

function Home() {

  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers(){
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  };
  async function createUsers() {
    await api.post("/usuarios",{
      name:inputName.current.value,
      age:inputAge.current.value,
      email:inputEmail.current.value,
    })   
    getUsers();
  }
  async function deleteUsers(id) {
    await api.delete(`/usuario/${id}`);
    console.log("Deletado")
    getUsers();
  }
  useEffect(()=>{

    getUsers();
    
  },[]);

  return (

    <div className='container'>
      <form action="">
        <h1>Cadastro de usuários</h1>
        <input name='name' type='text' ref={inputName} placeholder='nome...' />
        <input name='age' tyoe='number' ref={inputAge} placeholder='idade...'/>
        <input name='email' type='email' ref={inputEmail} placeholder='email...'/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map(user => (
        <div key={user.id}   className='card'>
          <div>
            <p>NOME:  <span>{user.name} </span>  </p>
            <p>IDADE: <span>{user.age} </span>   </p>
            <p>EMAIL: <span>{user.email} </span>  </p>
          </div>
          <div>
            <button onClick={()=> deleteUsers(user.id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Home
