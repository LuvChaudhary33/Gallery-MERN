import { useNavigate } from 'react-router-dom'
import loader from "../assets/loader.svg"
import { useGetPostsQuery } from '../Redux/Slice/slice'
import { useEffect } from 'react'

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate()
    const { data: data, isLoading, isSuccess, isError, error } = useGetPostsQuery()

    useEffect(() =>{
        if(!isLoading){
            if(data){
                navigate("")
              }else{
                navigate("/login")
              }
        }
        
    }, [isLoading])

    if(isLoading){
        return <img className="mx-auto my-[25vh] w-20" src={loader} />
    }
      
  return children

}

export default ProtectedRoute