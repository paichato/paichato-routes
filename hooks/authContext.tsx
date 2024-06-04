import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { http } from "../http";
  
  interface Location {
    latitude: number;
    longitude: number;
    country: string;
    city: string;
    region: string;
    updatedAt: Date;
  }
  export interface UserProps {
    _id?: string;
    age?: string;
    banned?: boolean;
    bookmarks?: [];
    createdAt?: Date;
    password?: string;
    phonenumber?: string;
    posts?: [];
    pro?: boolean;
    location?: Location;
    username?:ICommonProps;
    role?:ICommonProps;
  }
  
  interface ICommonProps{
    current:string;
    used:[key:string,createdAt:Date]
  }
  
  interface EmptyUser {}
  

  interface DataProps{
    user: UserProps;
    token:String;
  }

  interface ResponseProps{
    data: DataProps;
  }
  
  interface AuthContextData {
    user: UserProps & EmptyUser;
    loadUser: Boolean;
    logoutUser: () => Promise<void>;
    hasUser: () => Promise<void>;
    signIn: (response:ResponseProps) => Promise<void>;
  }
  
  interface AuthProviderProps {
    children: ReactNode;
  }

  export const storeUserDB = async (value:String) => {
    try {
      await AsyncStorage.setItem("@paredao-user", JSON.stringify(value || {}));
    } catch (e) {
      // saving error
      // throw e?.message;
      console.log(e);
      
      throw "Erro ao salvar user";
    }
  };

   const getUserDB = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@yourapp-user");
      return jsonValue != null ? JSON.parse(jsonValue) : {};
    } catch (e) {

      console.log(e);
      
      throw "Erroe loading user";
    }
  };

   const deleteUserDB = async () => {
    try {
      await AsyncStorage.setItem("@yourapp-user", JSON.stringify({}));
    } catch (e) {
      // saving error
      console.log();
      
      throw "Erro ao terminar sessao";
    }
  };
  
    const AuhtContext = createContext<AuthContextData>({} as AuthContextData);
    
    const AuthProvider = ({ children }: AuthProviderProps) => {

        const [data, setData] = useState<UserProps>({} as UserProps);
        const [loadUser, setLoadUser] = useState<Boolean>(true);
    
        const hasUser = async () => {
        setLoadUser(true);
        return await getUserDB()
            .then((usr:UserProps) => {
            console.log("User:", usr);
            if (usr) {
                setData(usr);
            }
    
            setData(usr);
            })
            .catch((err:unknown) => {
            console.log(err);
            setData({} as UserProps);
            })
            .finally(() => setLoadUser(false));
        };
    
        const signIn=async(res:ResponseProps)=>{
        await storeUserDB(JSON.stringify(res?.data?.user));
            http.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
            setData(res.data.user);
        }
    
        const logoutUser = async () => {
        setLoadUser(true);
        return await deleteUserDB()
            .then(() => {
            console.log("User logout");
        
            setData({} as UserProps);
            })
            .catch((err: unknown) => {
            console.log(err);
            
            })
            .finally(() => setLoadUser(false));
        };
    
        useEffect(() => {
        hasUser();
        }, []);
    
    
        return (
        <AuhtContext.Provider value={{ user: data, loadUser, logoutUser, hasUser, signIn }}>
            {children}
        </AuhtContext.Provider>
        );
    };
    
    const useAuth = (): AuthContextData => {
        const context = useContext(AuhtContext);
        return context;
    };
    
    export { AuthProvider, useAuth };
  