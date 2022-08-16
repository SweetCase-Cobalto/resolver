FROM node:16
# Server Config
ENV SERVER_PORT 3000
# Update
RUN apt update -y
RUN apt upgrade -y
RUN apt update -y
# install Common
RUN apt install -y sudo gcc make
RUN apt install -y libffi-dev
RUN apt install -y build-essential
RUN apt install -y default-libmysqlclient-dev
RUN apt install -y git
RUN apt install -y wget
RUN apt install -y gzip
RUN apt install -y make
# move
WORKDIR /
# Download Servers and Packages
RUN git clone --recursive https://github.com/SweetCase-Cobalto/resolver.git
WORKDIR /resolver
RUN npm i
# Install Python 3.9 and submodules (using Python)
WORKDIR /opt
RUN wget https://www.python.org/ftp/python/3.9.6/Python-3.9.6.tgz
RUN tar xzf Python-3.9.6.tgz
WORKDIR /opt/Python-3.9.6
RUN ./configure --enable-optimizations
RUN make altinstall
RUN rm -f /opt/Python-3.9.6.tgz
RUN update-alternatives --install /usr/bin/python python /opt/Python-3.9.6/python 1
RUN apt install -y python3-dev
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python get-pip.py
RUN pip3 install --upgrade pip
# Install Python Submmodules
WORKDIR /resolver/submodules/PCFL
RUN pip3 install -r requirements.txt
# Back to main and run
WORKDIR /resolver
ENTRYPOINT ["sh", "-c", "npm start"]