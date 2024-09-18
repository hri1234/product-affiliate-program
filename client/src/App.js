import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Routing from "./routing";
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import Store from "./Redux/store";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PrimeReactProvider } from 'primereact/api';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import CustomizerProvider from './Context/Customizer/CustomizerProvider';
import BookmarkProvider from './Context/Bookmark/BookmarkProvider';



class App extends Component {

  render() {
    return (
      <div>
        {console.log("Hello from APP")}
        <CustomizerProvider>
          <BookmarkProvider>
            <Provider store={Store}>
              <Toaster position="top-right" />
              <ToastContainer
                draggable
                autoClose={2000}
              />
              <PrimeReactProvider>
                <Routing />
              </PrimeReactProvider>
            </Provider>
          </BookmarkProvider>
        </CustomizerProvider>
      </div>
    );
  }
}

export default App;
 