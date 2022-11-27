# Тестовое задание

База пользователей

## Как запустить проект

Клонировать репозиторий и перейти в него в командной строке:

```
git clone https://github.com/on1y4fun/users_flask_app.git

```

Создать и активировать виртуальное окружение:

```
python -m venv env
```

```
source venv/Scripts/activate
```

Установить зависимости из файла requirements.txt:

```
pip install --upgrade pip
```

```
pip install -r requirements.txt
```

Выполнить миграции:

```
flask db migrate
```

Запустить проект:

```
flask --app app run
```