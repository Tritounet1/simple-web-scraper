# Étape 1 : Utiliser une image Python de base
FROM python:3.9-slim

# Installer git et d'autres dépendances nécessaires
RUN apt-get update && apt-get install -y git && apt-get clean

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY requirements.txt ./

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le code source
COPY . .

# Exposer le port utilisé par Flask (par défaut 5000)
EXPOSE 5000

# Commande par défaut pour démarrer Flask
CMD ["python", "main.py"]
