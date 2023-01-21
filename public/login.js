function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  function handle() {
    loggedUser.email = '';
    loggedUser.balance = '';
    loggedUser.name = '';
    loggedUser.isLogged = false;

    document.getElementById('deposit').style.display='none';
    document.getElementById('withdraw').style.display='none'; 
    document.getElementById('logout').style.display='none'; 
    document.getElementById('create-account').style.display=''; 
    document.getElementById('login').style.display=''; 
    document.getElementById('welcome-message').innerHTML = `Welcome, ${loggedUser.name}`;
    document.getElementById('welcome-message').innerHTML = '';
    
    props.setShow(true);
    props.setStatus('');
  }
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Logout
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            
            loggedUser.email = data.email;
            loggedUser.balance = data.balance;
            loggedUser.name = data.name;
            loggedUser.role = data.role;
            
            document.getElementById('deposit').style.display='';
            document.getElementById('withdraw').style.display=''; 
            document.getElementById('logout').style.display=''; 
            loggedUser.role === 'admin' 
            ? document.getElementById('all-data').style.display=''
            : document.getElementById('all-data').style.display='none';

            document.getElementById('create-account').style.display='none'; 
            document.getElementById('login').style.display='none'; 

            document.getElementById('welcome-message').innerHTML = `Welcome, ${loggedUser.name}`;
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}