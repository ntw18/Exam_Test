/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import  React, {useState} from 'react';
 import { 
   Button, 
   Text,
   TouchableOpacity,
   View,
   SafeAreaView,
   ScrollView,
   FlatList,
   StyleSheet,
   Dimensions,
   TextInput,
  } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { RadioButton } from 'react-native-paper';
 import { MultipleChoice } from 'react-native-multiple-choice-picker';
 import { DATA } from './data/Data';

  
 const ExamScreen = ({ navigation, route }) => {

const correct = () => {
  console.log('correct!');
}

const uncorrect = () => {
  console.log('uncorrect!');
}

const [value, setValue] = React.useState();
const Item = ({ item, onPress, style}) => (
  // <TouchableOpacity style={[styles.item, style]}>
    <View style={[styles.item, style]}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={[styles.title, {color: item.color}]}>{item.id}. </Text>
      <Text style={[styles.title, {color: item.color}]}>{item.title}</Text>
    </View>
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
       <View style={{ flexDirection: 'row' }}>
        <RadioButton value="first" onPress={item.choice1 == item.answer ? correct() : uncorrect()}/>
        <Text style={[styles.choice, {color: item.color}]} >{item.choice1}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <RadioButton value="second"  onPress={item.choice2 == item.answer ? correct() : uncorrect()}/>
        <Text style={[styles.choice, {color: item.color}]}>{item.choice2}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <RadioButton value="tree" onPress={item.choice3 == item.answer ? correct() : uncorrect()}/>
        <Text style={[styles.choice, {color: item.color}]} >{item.choice3}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <RadioButton value="four" onPress={item.choice4 == item.answer ? correct() : uncorrect()}/>
        <Text style={[styles.choice, {color: item.color}]} >{item.choice4}</Text>
      </View> 
    </RadioButton.Group>
    {/* <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.btnchoice}></View>
        <Text style={[styles.choice, {color: item.color}]}>{item.choice1}. </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.btnchoice}></View>
        <Text style={[styles.choice, {color: item.color}]}>{item.choice2}. </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.btnchoice}></View>
        <Text style={[styles.choice, {color: item.color}]}>{item.choice3}. </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.btnchoice}></View>
        <Text style={[styles.choice, {color: item.color}]}>{item.choice4}. </Text>
      </View>
    </View> */}
    </View>
  // </TouchableOpacity>
);

const renderItem = ({ item }) => {
  const backgroundColor = item.id === selectedId ? "#fff" : "#fff";
  return (
    <View>
      <Item
        item={item}
        hideChevron={true}
        style={{ backgroundColor }}
      />
    </View>
  );
};

  const [selectedId, setSelectedId] = useState(null);
  const nameLogin = route.params.nameLogin;

   return (
    <SafeAreaView style={styles.container}>
    <ScrollView 
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}>
       <View style={{ flexDirection: 'row' }}>
     <Text style={styles.exam}>{nameLogin}</Text>
     <Text style={styles.board} onPress={() => navigation.navigate('Board', {nameLogin: nameLogin})}>Board</Text>
     </View>
     <FlatList
       data={DATA}
       renderItem={renderItem}
       keyExtractor={(item) => item.ID}
       extraData={selectedId}
     />
     <View style={{marginHorizontal: 100, marginVertical: 15}}>
     <Button title='Submit' onPress={() => navigation.navigate('Score', {nameLogin: nameLogin})}/>
     </View>
   </ScrollView>
 </SafeAreaView>
   
   );
 }
 
 function BoardScreen({ navigation, route }) {
   const nameLogin = route.params.nameLogin;
   const score = 10;
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 15 }}>
       <Text style={{ fontSize: 20, fontWeight: '700', paddingVertical: 10}}>Leader Board</Text>
       <View>
         <Text style={{ fontSize: 16, fontWeight: '700', paddingVertical: 10, position: 'absolute', top: 0, left: -150 }}>Name</Text>
         <Text style={{ fontSize: 16, fontWeight: '700', paddingVertical: 10, position: 'absolute', top: 0, left: 100 }}>Score</Text>
       </View>
       <View style={{ paddingVertical: 50, position: 'absolute', top: 60, left: 55 }}>
          <Text>{nameLogin}</Text>
       </View>
       <View style={{ paddingVertical: 50, position: 'absolute', top: 60, left: 320 }}>
          <Text>{score}</Text>
       </View>
     </View>
   );
 }

 const ScoreScreen = ({ navigation, route }) => {
  const nameLogin = route.params.nameLogin;
  const score = 10;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
       <Text style={{ fontSize: 32, fontWeight: '700', paddingVertical: 10}}>{nameLogin} SCORE</Text>
          <Text style={{ fontSize: 24, fontWeight: '700', paddingVertical: 10}}>{score}</Text>
       <View >
        <Button title="Again" onPress={() => navigation.popToTop()}/>
      </View>
     </View>
  );
}

 const LoginScreen = ({ navigation }) => {
  const [Name, setName] = useState([]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.welcomeText}>Welcome To Exam</Text>
      <Text style={styles.welcomeText}>Enter your name</Text>
      <TextInput
        style={styles.inputBox}
        value={Name}
        onChangeText={setName}
        placeholder="Enter Your Name"
      />
      <View style={{paddingTop: 10}}>
        <Button title="Enter" onPress={() => navigation.navigate('Exam', {nameLogin: Name})}/>
      </View>
      
    </View>
  );
}
 
 const Stack = createNativeStackNavigator();
 
 const App = () => {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Exam" component={ExamScreen} />
          <Stack.Screen name="Score" component={ScoreScreen}  options={{headerShown: false}}/>
          <Stack.Screen name="Board" component={BoardScreen} />
       </Stack.Navigator>
     </NavigationContainer>
   );
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    height: 190,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: '#8A8A8E',
  },
  choice: {
    fontSize: 18,
    color: '#8A8A8E',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  data: {
    fontSize: 20,
    color: '#8A8A8E',
    paddingTop: 30,
    fontFamily: 'Tahoma',
    fontWeight: '700',
  },
  exam: {
    paddingLeft: 20, 
    paddingBottom: 10, 
    fontSize: 20, 
    fontFamily:'Tahoma', 
    fontWeight: '700' 
  },
  board: {
    fontSize: 20, 
    fontFamily:'Tahoma', 
    color: '#2082F6',
    position: 'absolute',
    top: 0, 
    left: 340, 
  },
  btnchoice: {
    height: 20, 
    width: 20, 
    borderRadius: 30, 
    borderWidth: 2, 
    borderColor: '#000', 
    marginVertical: 5,
  },
  welcomeText: {
    fontSize: 25,
    marginTop: 15,
    textAlign: 'center',
  },
});

 export default App;