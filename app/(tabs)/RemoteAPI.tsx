/**
 * Here we will demo useEffect for fetching remote data.
 */
import React, { useEffect, useState } from 'react';
import  ShowUser from '../../components/ShowUser';
import { ScrollView, Text, View, TextInput, ActivityIndicator } from 'react-native';
import UserFetched from './type-def';

type Props={
    name?: string;
}

const RemoteAPIComponent : React.FC<Props> = ({name="Afam"}) => {
    const [userFetched, setUserFetched] = useState<UserFetched>({ user: null, error: null });
    const [userId, setUserId] = useState<string>('1');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const setUserIdToFetch = (text: string) => {
        if (text!="") { // ensure the text is not empty
            setUserId(text);
        }
    }
    useEffect(()=>{
        const abortController = new AbortController();
        setLoading(true);
        const fetchUserData = async (id: string) => {
         try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`
            , {
                signal: abortController.signal,
                headers: {
                    'Content-Type': 'application/json',
                    // Add other headers if needed
                }
            }
            );
            if (!response.ok ||response.status > 299) {
                
                setUserFetched({ user: null, error: `Response Status=${response.status}` });
                setLoading(false);
                return;
            }
            const data = await response.json();
            setUserFetched({ user: data, error: null });
        } catch (error:any) {
            if(!abortController.signal.aborted)
            setUserFetched({ user: null, error: error.message });
            setLoading(false);
            setError(error.message);
        }
        finally {
            if(!abortController.signal.aborted) {
                setLoading(false);
                
            }
        }
    };
        fetchUserData(userId);
        return () => {
            abortController.abort(); // cleanup function to abort fetch if component unmounts
        };
    },[userId]); // fectch user data when userId changes
    if (loading) return <ActivityIndicator size="large" />;
    if (error) return <Text>Error: {error}</Text>;
    if (!userFetched.user) return <Text>No data found</Text>;
    
    return (
       <ScrollView>
            <View style={{ flex: 1, padding: 20, margin: 40, 
            backgroundColor: '#f0f0f0', borderRadius: 10 }}>
            <Text> Hello {name}, Welcome to our RemoteAPI  App</Text>
            </View>
        
            <View style={{ flex: 1, padding: 20 }}>
            <TextInput placeholder="Enter UserId (1 to 10) here to fetch immediately ..."
            onChangeText={setUserIdToFetch} keyboardType='numeric' autoFocus />
            </View>
            
            <View style={{ flex: 1, padding: 20 }}>
            <ShowUser userFetched={userFetched} />
            </View>

       </ScrollView>
        )
};
export default RemoteAPIComponent; 