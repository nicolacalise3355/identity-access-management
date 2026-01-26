from models.entities import User

class AuthService:
    def __init__(self):
        # In futuro inietterai qui il repository del DB (es. UserRepository)
        pass

    async def authenticate_user(self, email: str, password: str) -> User:
        """
        This part must be changed with the real login to the backend application
        """
        print(f"--- MOCK AUTH ---")
        print(f"Login for: {email}")
        print(f"-------------------")
        
        # Simuliamo un successo
        return User(email=email)
