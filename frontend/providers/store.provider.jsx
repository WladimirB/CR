import React from 'react';
import StoreContext from './context/storeContext';
import ClientCookiesManager from '../../services/clientCookiesManager';
import { ACCESS_KEY } from '../../config/uriparts';

class Store extends React.Component {
  static contextType = StoreContext;
  constructor(props) {
    super(props);
    this.manager = new ClientCookiesManager();

    this.state = {
      isLogged: !!(this.manager.get(ACCESS_KEY)),
      setIsLogged: value => {
        this.setState((value) => ({
         isLogged:value
        }))
      },
      message: '',
      setMessage: value => {
        this.setState(() => ({
          message:value 
        }))
      },
      variant: '',
      setVariant: value => {
        this.setState(() => ({
          variant:value ? 'success' : 'danger'
        }))
      },
      cleanDialog: () => {
        this.setState(() => ({
          message:'',
          variant:''
        }))
      }
    };

    
  }

  render() {
    return (
      <StoreContext.Provider value={{ context: this.state }}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default Store;
