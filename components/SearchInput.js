import {useState} from 'react';
import { View,StyleSheet,TextInput } from 'react-native';

const SearchInput = ({pHolder,onSubmit}) => {

  const [text, setText] = useState("");

  handleChangeText = (tt) => {
    setText(tt);
  }

  handleSubmit = () => {
    if (!text) return ;

    onSubmit(text);
    setText("");
  }

  return (

    <View style={styles.container}>

      <TextInput
        autoCorrect={false}
        placeholder={pHolder}
        placeholderTextColor="white"
        style={styles.textInput}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
        value={text}
      />

    </View>
  );
  
}


export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
