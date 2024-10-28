import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, StatusBar, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTaskContext } from './DataContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { tasks, toggleTaskCompletion, deleteTask } = useTaskContext();
    const [searchTerm, setSearchTerm] = useState('');


    const filteredTasks = tasks.filter((task) => {
        const term = searchTerm.toLowerCase();
        return (
            task.title.toLowerCase().includes(term) ||
            task.description.toLowerCase().includes(term) ||
            task.status.toLowerCase().includes(term)
        );
    });
    const handleDelete = (id:any) => {
       
          Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                  deleteTask(id); // Delete task
                  navigation.goBack();
                },
              },
            ],
            { cancelable: true }
          );
      
      };

  return (
    <SafeAreaView style={styles.mainContainer}>
       
         <StatusBar barStyle="light-content" backgroundColor="#1e90ff" />

    <View style={styles.containnerStyle}>
       
        <View style={styles.kensiLabMainView}>
            <Text style={styles.kensilab} >
                Kensi Labs Assignment
            </Text>
        </View >
        <View>
            {tasks.length >=1 &&  <TextInput
                    style={styles.searchInput}
                    placeholder="Search by title, description, or status"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />}
       
        </View>
        <ScrollView>
        <View style={{ padding: 16}}>
{filteredTasks.length < 1 ? <View style={{alignItems:"center", marginVertical:20}}><Text style={{color:"#A9A9A9"}}>No Task Data Avalible</Text></View> :<View>
<FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          
            <View style={styles.flatListStyle}>
               
                
                   <View style={{flex:0.85}}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.textMargin}>{item.description}</Text>
<Text>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
<Text style={styles.textMargin}> Status : <Text style={{color: item.status == "Pending" ? "#FF5733": "#008000"}}> {item.status}</Text> </Text>
                </View>
                <View style={{flex:0.15, justifyContent:"space-between"}}>
                <TouchableOpacity onPress={() => navigation.navigate('TaskDetails', { task: item })}>
    <Icon name="edit" size={30} color="#71797E" />
</TouchableOpacity>
                <TouchableOpacity onPress={() =>{handleDelete(item.id) }}>
                <Icon name="trash" size={30} color="#FF0000" />
                </TouchableOpacity>
               

                </View>
            
            </View>
          
        )}
      />
    </View>}
          
    <TouchableOpacity onPress={() => navigation.navigate('TaskDetails')}>
        <View style={styles.buttonStyle}>
        <Text style={{fontSize:20, color:"#fffFFF", fontWeight: 'bold'}}> Add New Task</Text>
        </View>
               
                </TouchableOpacity>

       {/* <Button title="Add New Task" onPress={() => navigation.navigate('TaskDetails')} />
        */}
        </View>
   
        </ScrollView>
   
  </View>
  
  </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

    kensilab:{
        fontSize:24
    },
    kensiLabMainView:{
alignItems:"center",
justifyContent:'center',
backgroundColor:"#1e90ff",    
height:45
},
flatListStyle:{ padding: 16,
     backgroundColor: '#E5E4E2',
    borderRadius:10,
    borderColor:'#A9A9A9',
    borderWidth:2,
    flex:1,
    flexDirection:"row",
    elevation:4,
    marginTop:10
    },
    buttonStyle:{
        backgroundColor:"#1e90ff",   
        alignItems:"center",
        height:40,
        justifyContent:"center",
        borderRadius:8,
        elevation:5,
        marginTop:20
    },
    textMargin:{
        marginVertical:5
    },
    titleText:{
        fontSize:16, 
        fontWeight: 'bold'
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        margin: 16,
    },
    mainContainer:{ 
        flex: 1 , 
        backgroundColor: '#1e90ff'
    },
    containnerStyle:{ 
        flex: 1,
         backgroundColor:"#FFFFFF" 
        },
 
})

