class ReduxServiceInnerClass {
  store = null;

  init(store){
    this.store = store;
  }

  dispatch(action){
    if(this.store){
      this.store.dispatch(action);
    }
    else{
      throw 'Store is not initialized';
    }
  }
}

const ReduxService =  new ReduxServiceInnerClass();
export default ReduxService;
