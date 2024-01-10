export const getContentTiny = (ref)=>{
    if(ref){
        return ref.current.getContent();
    }
    return "";
}