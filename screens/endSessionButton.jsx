import { Button } from "react-native";
import { Dynatrace } from "@dynatrace/react-native-plugin";

export default  () =>{
    const handleOnPress = ()=>{
        Dynatrace.flushEvents()
        Dynatrace.endSession()
    }
    return (<Button title='end user session'onPress={handleOnPress}>

    </Button>)

}