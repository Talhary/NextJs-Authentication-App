import {ResetForm} from '@/components/auth/reset-form'
type PageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ResetPassword = ({searchParams}:PageProps) => {
  
  return (
    <><ResetForm/></>
  )
}

export default ResetPassword