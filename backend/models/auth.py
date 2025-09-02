# Models of ./routes/auth.py
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    username: str
    email: EmailStr

class RefreshTokenRequest(BaseModel):
    token: str 

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

# class ResetPasswordRequest(BaseModel):
#     password: str
