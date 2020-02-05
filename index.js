const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 동작 중 입니다.`)
})