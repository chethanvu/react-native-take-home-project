import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTaskContext } from './DataContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditScreen = () => {
  const { addTask, editTask, deleteTask } = useTaskContext();
  const navigation = useNavigation();
  const route = useRoute();
  const existingTask = route.params?.task;

  const [title, setTitle] = useState(existingTask ? existingTask.title : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');
  const [dueDate, setDueDate] = useState(existingTask ? new Date(existingTask.dueDate) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [titleErr, setTitleErr] = useState<boolean>(false);
  const[status, setStatus] = useState<string>(existingTask ? existingTask.status : '')
  const [descriptionErr, setDescriptionErr] = useState<boolean>(false);
  const [statusErr, setstatesErr] = useState<boolean>(false);

  const isEditing = Boolean(existingTask);

  const handleSave = () => {
    if(title != ""  && description != '' && status != ''){
        if (isEditing) {
  
            const updatedTask = { ...existingTask, title, description, dueDate , status};
            editTask(existingTask.id, updatedTask); // Edit existing task
          } else {
             
                  const newTask = { id: uuid.v4().toString(), title, description, dueDate, completed: false , status};
                  addTask(newTask); // Add new task
             
            
          }
          navigation.goBack();

    } else if(title == ''){
        setTitleErr(true)
    } else if(description == ''){
        setDescriptionErr(true)

    } else if(status == ''){
        setstatesErr(true)

    }
   
  };

  

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <View style={styles.mainConntainer}>
      <Text style={styles.headingContainer}>{isEditing ? 'Edit Task' : 'New Task'}</Text>
      <Text style={styles.titletextStyle}>Title : </Text>
      <TextInput placeholder="Title" value={title} onChangeText={(text)=>{setTitle(text), setTitleErr(false)}} style={styles.textInputStyle} />
      {titleErr && <Text style={{color:'#FF0000'}}> Please Enter Title</Text>}
      <Text style={styles.titletextStyle}>Description : </Text>
      <TextInput placeholder="Description" value={description} onChangeText={(text)=>{setDescription(text), setDescriptionErr(false)} }style={styles.textInputStyle} />
      {descriptionErr && <Text style={{color:'#FF0000'}}> Please Enter Description</Text>}

      <Text style={styles.titletextStyle}>Status : {status}</Text>
      <View style={{flexDirection:'row',alignSelf:"center"}}>
        <View>
        <TouchableOpacity  onPress={() => {setStatus('Pending'), setstatesErr(false)}} >
        <View style={[styles.statusStyle, {backgroundColor:'#FF5733'}]}>
        
                <Text  style={{marginLeft:5, fontSize:18}}>Pending</Text>
        </View>
               
                </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={() =>{setStatus('Completed'), setstatesErr(false)} } >
        <View style={[styles.statusStyle, {backgroundColor:"#008000",}]}>
        
                <Text  style={{marginLeft:5, fontSize:18}}>Completed</Text>
        </View>
               
                </TouchableOpacity>

        </View>
      </View>
      {statusErr && <Text style={{color:'#FF0000', textAlign:'center'}}> Please Select Status</Text>}
      <View style={{marginTop:20, flexDirection:"row"}}>
      <Text style={{ fontSize: 18 , marginBottom:20}}>Due Date : {dueDate.toLocaleDateString()}</Text>
      
      <TouchableOpacity onPress={() => setShowDatePicker(true)} >
        <View style={{flexDirection:"row", justifyContent:'center',  alignItems:'center', marginLeft:12}}>
        <Icon name="calendar" size={30} color="#FF0000" />
                <Text  style={{marginLeft:5}}>Select Due Date</Text>
        </View>
               
                </TouchableOpacity>
      </View>
     
      

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity onPress={handleSave}>
        <View style={styles.buttonStyle}>
        <Text style={{fontSize:20, color:"#fffFFF", fontWeight: 'bold'}}> {isEditing ? "Update Task" : "Save Task"}</Text>
        </View>
               
                </TouchableOpacity>

    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
    headingContainer:{ fontSize: 17 ,
         marginBottom:10,  
         textAlign:"center", 
         fontWeight: 'bold'},
    textInputStyle:{ 
        borderBottomWidth: 1,
         marginBottom: 6, 
         fontSize: 16 },
    buttonStyle:{
        backgroundColor:"#1e90ff",   
        alignItems:"center",
        height:40,
        justifyContent:"center",
        borderRadius:8,
        elevation:5,
        marginTop:20
    },
    statusStyle:{flexDirection:"row",
     justifyContent:'center', 
     alignItems:'center',
      marginLeft:12, 
       width:'80%',
        height:30,
      borderRadius:5},
      mainConntainer :{
        flex: 1, padding: 16 
      },
      titletextStyle:{ fontSize: 18 ,
         marginBottom:6}
    
 
})
