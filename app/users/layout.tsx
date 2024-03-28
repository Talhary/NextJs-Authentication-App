import {Providers} from '@/Redux/Provider'

const layout = ({children}:{children:React.ReactNode}) => {
    
    return (
    <Providers>
        {children}
    </Providers>
  )
}
export default layout