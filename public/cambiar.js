function Cambiar(cambiar){
    if(cambiar == 1){
        document.getElementById("titulo2").innerHTML = "IA Procesos Administrativos CFTHS";
        let contenedor = document.getElementById("contenedor");
        let main = document.getElementById("main");
        let sidebar = document.getElementById("sidebar");
        
        contenedor.style = `background-color: none;
                            padding-left: 4%;
                            width: 90%;
                            height: 90%;
                            margin-top: 1%;
                            margin-bottom: 3%;
                            margin-left: 4%;
                            margin-right: 4%;
                            display: grid;
                            grid-gap: 1%;
                            grid-template-columns: repeat(2, 1fr);
                            grid-template-rows: repeat(3, auto);`;
        sidebar.style = `grid-column-start: span 2;
                         margin-right: 4%;
                         background: none;`;
        main.style = `margin-top: -40px;
                      text-indent: -1000%;
                      font: 0/0 a;
                      text-shadow: transparent;
                      color: transparent;
                      text-decoration: none;`; 
                         
    }else if(cambiar == 2){
        document.getElementById("titulo2").innerHTML = "IA Procesos Administartivos CFTHS - ADMISIONES";
        let contenedor = document.getElementById("contenedor");
        let main = document.getElementById("main");
        let sidebar = document.getElementById("sidebar");
        
        contenedor.style = `background-color: none;
                            padding-left: 4%;
                            width: 90%;
                            height: 90%;
                            margin-top: 1%;
                            margin-bottom: 3%;
                            margin-left: 4%;
                            margin-right: 4%;
                            display: grid;
                            grid-gap: 1%;
                            grid-template-columns: repeat(2, 1fr);
                            grid-template-rows: repeat(3, auto);`;
        sidebar.style = `grid-column-start: 1 / 2;
                         margin-right: 10%;
                         background: none;`;
        main.style = `grid-column-start: 2 / 1;
                      width: 100%;`;   
                        
    }else if(cambiar == 3){
        document.getElementById("titulo2").innerHTML = "IA Procesos Administartivos CFTHS - FACTURACIÓN";
        let contenedor = document.getElementById("contenedor");
        let main = document.getElementById("main");
        let sidebar = document.getElementById("sidebar");
        
        contenedor.style = `background-color: none;
                            padding-left: 4%;
                            width: 90%;
                            height: 90%;
                            margin-top: 1%;
                            margin-bottom: 3%;
                            margin-left: 4%;
                            margin-right: 4%;
                            display: grid;
                            grid-gap: 1%;
                            grid-template-columns: repeat(2, 1fr);
                            grid-template-rows: repeat(3, auto);`;
        sidebar.style = `grid-column-start: 1 / 2;
                         margin-right: 10%;
                         background: none;`;
        main.style = `grid-column-start: 2 / 1;
                      width: 100%;`;  
    }else if(cambiar == 4){
        document.getElementById("titulo2").innerHTML = "IA Procesos Administartivos CFTHS - AFILIACIONES";
        let contenedor = document.getElementById("contenedor");
        let main = document.getElementById("main");
        let sidebar = document.getElementById("sidebar");
        
        contenedor.style = `background-color: none;
                            padding-left: 4%;
                            width: 90%;
                            height: 90%;
                            margin-top: 1%;
                            margin-bottom: 3%;
                            margin-left: 4%;
                            margin-right: 4%;
                            display: grid;
                            grid-gap: 1%;
                            grid-template-columns: repeat(2, 1fr);
                            grid-template-rows: repeat(3, auto);`;
        sidebar.style = `grid-column-start: 1 / 2;
                         margin-right: 10%;
                         background: none;`;
        main.style = `grid-column-start: 2 / 1;
                      width: 100%;`;  
    }else if(cambiar == 5){
        document.getElementById("titulo2").innerHTML = "IA Procesos Administartivos CFTHS - ORIENTACIÓN AL USUARIO";
        let contenedor = document.getElementById("contenedor");
        let main = document.getElementById("main");
        let sidebar = document.getElementById("sidebar");
        
        contenedor.style = `background-color: none;
                            padding-left: 4%;
                            width: 90%;
                            height: 90%;
                            margin-top: 1%;
                            margin-bottom: 3%;
                            margin-left: 4%;
                            margin-right: 4%;
                            display: grid;
                            grid-gap: 1%;
                            grid-template-columns: repeat(2, 1fr);
                            grid-template-rows: repeat(3, auto);`;
        sidebar.style = `grid-column-start: 1 / 2;
                         margin-right: 10%;
                         background: none;`;
        main.style = `grid-column-start: 2 / 1;
                      width: 100%;`;  
    }
}

document.getElementById("titulo2").innerHTML = "IA Procesos Administartivos CFTHS";
let contenedor = document.getElementById("contenedor");


contenedor.style = `background-color: none;
                    padding-left: 4%;
                    width: 90%;
                    height: 90%;
                    margin-top: 0%;
                    margin-bottom: 3%;
                    margin-left: 4%;
                    margin-right: 4%;
                    display: grid;
                    grid-gap: 1%;
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: repeat(3, auto);`;
                    
let sidebar = document.getElementById("sidebar");

sidebar.style = `grid-column-start: span 2;
                 margin-right: 4%;
                 background: none;`;
let main = document.getElementById("main");
main.style = `margin-top: -40px;
              text-indent: -1000%;
              font: 0/0 a;
              text-shadow: transparent;
              color: transparent;
              text-decoration: none;`;

export { Cambiar };