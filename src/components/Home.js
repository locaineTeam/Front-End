import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import { variables } from '../providers/Variables';


export class Home extends Component{
    
    

    constructor(props){
        super(props);
        this.editProfile =  this.editProfile.bind(this);
        this.editFacade =  this.editFacade.bind(this);
        this.messages =  this.messages.bind(this);        
        this.request =  this.request.bind(this);        
        this.match =  this.match.bind(this);
        this.state={
            genders:[],
            preferencias:"",
            modalTitle:""
        }
    }

    editProfile(){
        let path = `editProfile`;
        this.props.history.push(path);
    }

    editFacade(){
        let path = `editFacade`;
        this.props.history.push(path);
    }

    messages(){
        let path = `messages`;
        this.props.history.push(path);
    }

    request(){
        let path = `request`;
        this.props.history.push(path);
    }

    match(){
        let path = `match`;
        this.props.history.push(path);
    }

    editPreferences(){
        this.setState({
            modalTitle:"Edit Preferences",
            preferencias:""
        });
        this.refreshList();
    }
    
    refreshList(){
        fetch(variables.LOCAL_URL+'v1/user/preferences')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            this.setState({genders:data});
        });
        
    }

    otherClick(){
        

    }
    changePreference =(e)=>{
        this.setState({preferencias:e.value});
    }

    render(){
        const {
            genders,
            preferencias,
            modalTitle
        }=this.state;

        return (
            <div className="container-fluid">
                <div className="form-control form-control-sm m-2">    
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                    <div className="container">                        
                    <a className="navbar-brand" href="#">
                        <h1 className="text-light"> PAGINA INICIAL</h1> 
                    </a>
                    <div className="collapse navbar-collapse" id="navbarsHome">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdown07" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                            <ul className="dropdown-menu" aria-labelledby="dropdown07">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        </ul>
                        </div>
                        </div>
                    </nav>                
                </div>
                
                <div className="row">
                        <div className="col-sm" >
                            <div className="col-2">
                            <button type="button"
                            className="btn rounded-pill btn-light mr-1"
                            onClick={()=>this.messages()}>
                                <span>Mensajes</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-messenger" viewBox="0 0 16 16">
                                <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/>
                                </svg>
                            </button>
                            </div>
                            <div className="col-2">
                            <button type="button"
                            className="btn rounded-pill btn-light mr-1"
                            onClick={()=>this.request()}>
                                <span>Solicitudes</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                            </button>  
                            </div>

                           
                        </div>
                        <div className="col-sm">
                        <button type="button"
                            className="btn rounded-pill btn-light mr-1"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={()=>this.editPreferences()}>
                                <span>Preferencias</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>

                            <button type="button"
                            className="btn btn-outline-light d-grid gap-2" 
                            onClick={()=>this.match()}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                </div>                                
                                <span className="badge bg-secondary">¡Dale al Match!</span>                                
                            </button>

                            <button type="button"
                            className="btn rounded-pill btn-light mr-1"
                            onClick={()=>this.editFacade()}>
                                <span>Editar Fachada</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>

                            <button type="button"
                            className="btn rounded-pill btn-light mr-1"
                            onClick={()=>this.editProfile()}>
                                <span>Editar Perfil</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>

                        </div>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Editar Caracteristicas</span>
                            <select className="form-select"
                            onChange={this.changePreference}
                            value={preferencias}>
                                {genders.map(gen=><option key={gen}>
                                    {gen}
                                </option>)}
                            </select>
                        </div>

                        <button type="button"
                            className="btn btn-primary float-start"
                            onClick={()=>this.otherClick()}>
                                Update
                        </button>

                    </div>

                    </div>
                    </div> 
                    </div>
            </div>
        );
    }
}
export default withRouter(Home);