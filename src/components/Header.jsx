import {Link } from "react-router-dom";

function Header({logo}) {
  return (
    <header>
        <div className="container u-flexbox u-align-items-center">
          <div className="u-flexbox u-align-items-center u-fill-width u-justify-content-space-between">
                <div className="header__logo">
                        <Link className="u-block" to="/" title="Vinted logo">
                            <img src={logo} />
                        </Link>
                </div>
                <div className="header__search u-flexbox u-align-items-center u-fill-width u-justify-content-center">
                        <input placeholder="Rechercher des articles"></input>
                </div>  
                <div className="header__right u-flexbox u-align-items-center u-justify-content-end">
                        <a href="/" title="S'incrire" className="button button-secondary">
                            S'inscrire
                        </a>
                        <a href="/" title="S'incrire" className="button button-secondary">
                            Se connecter
                        </a>   
                        <a href="/" title="S'incrire" className="button button-primary">
                            Vends tes articles
                        </a>                  
                </div>  
          </div>          
        </div>
    </header>
  )
}

export default Header