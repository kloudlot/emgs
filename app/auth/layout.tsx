import { Box } from "@chakra-ui/react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      {children}
    </Box>
  )
}

export default AuthLayout