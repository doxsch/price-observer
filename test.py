import requests
from urllib.request import urlopen


def main():
    print("python main function")
    # get html from site and write to local file
    url = 'https://google.com'
    headers = {'Content-Type': 'text/html', }
    response = requests.get(url, headers=headers)
    html = response.text
    print(html)
    with open('google_com_html', 'w') as f:
        f.write(html)


if __name__ == '__main__':
    main()
