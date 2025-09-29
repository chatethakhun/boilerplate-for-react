const getAccessToken = () => {
  const token = localStorage.getItem('accessToken')
  return token
}

export { getAccessToken }
