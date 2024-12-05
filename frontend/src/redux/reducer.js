var myreducer=( state={data:[],location:{city:'',language:['empty']}},action)=>{
    var newstate;
    if(action.type==='movies-title'){
     newstate={
        ...state,
        data:action.payload
     }
    }
     else if(action.type==='location'){
        newstate={
            ...state,
            location:action.payload
        }
    }
    else{
        newstate=state;
    }
    return newstate;

}
export default myreducer;