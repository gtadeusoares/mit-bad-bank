function NavBar(){
  function logout() {
    loggedUser.email = '';
    loggedUser.balance = '';
    loggedUser.name = '';
    loggedUser.role = '';

    document.getElementById('deposit').style.display='none';
    document.getElementById('withdraw').style.display='none'; 
    document.getElementById('logout').style.display='none'; 
    document.getElementById('all-data').style.display='none'; 
    document.getElementById('create-account').style.display=''; 
    document.getElementById('login').style.display=''; 
    document.getElementById('welcome-message').innerHTML = `Welcome, ${loggedUser.name}`;
    document.getElementById('welcome-message').innerHTML = '';
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" id="create-account" href="#/CreateAccount/">Create Account{/*Create Account*/}</a>
          </li>
          <li className="nav-item" id="deposit" style={{display: 'none'}}>
            <a className="nav-link"  href="#/deposit/">Deposit{/*Deposit*/}</a>
          </li>
          <li className="nav-item" id="withdraw" style={{display: 'none'}}>
            <a className="nav-link"  href="#/withdraw/">Withdraw{/*Withdraw*/}</a>
          </li>
          <li className="nav-item" id="balance" style={{display: 'none'}}>
            <a className="nav-link"   href="#/balance/">Balance{/*Balance*/}</a>
          </li>
          <li className="nav-item" id="all-data" style={{display: 'none'}}>
            <a className="nav-link"  href="#/alldata/">All Data{/*AllData*/}</a>
          </li> 
          <li className="nav-item" id="login">
            <a className="nav-link"  href="#/login/">Login{/*Login*/}</a>
          </li>     
          <li style={{position: 'absolute', right: '30px'}} >
              <p id="welcome-message" style={{marginBottom: 0, padding: 8}}>{/*Welcome Message*/}</p> 
          </li>
          <li id="logout" style={{display: 'none'}} >
            <a className="nav-link"  href="#/" onClick={logout}>Logout{/*Logout*/}</a>
          </li>
          <li className="nav-item" id="admin-create" style={{display: 'none'}}>
            <a className="nav-link"   href="#/admin-create/">Admin Create{/*Balance*/}</a>
          </li>
        </ul>
      </div>
    </nav>

  );
}