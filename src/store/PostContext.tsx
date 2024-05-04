import { useState ,createContext} from "react";
export const PostContext = createContext<any>(null)

export default function Post({ children }: { children: React.ReactNode }) {
    const [postDetails,setPostDetails] = useState<any>(null)
    return(
        <PostContext.Provider value={{postDetails,setPostDetails}}>
            {children}
        </PostContext.Provider>
    )
}