import React from 'react';
import { StyleSheet, View ,Text,SafeAreaView, Button} from 'react-native';

const Tabs = ({increment,decreament}) => {
    return (
        <SafeAreaView>
          <Button title="Increase" onPress={increment} />
          <View style={{marginTop:20}}>
          <Button title="decreament" onPress={decreament} style ={{marginTop:20}} />

            </View>  
                 

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Tabs;
