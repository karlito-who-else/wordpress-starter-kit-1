sudo apt-get install -y openjdk-7-jre
sudo apt-get install unzip

wget http://s3.amazonaws.com/ec2-downloads/ec2-api-tools.zip

sudo mkdir /usr/local/ec2
sudo unzip ec2-api-tools.zip -d /usr/local/ec2

export JAVA_HOME="/usr/lib/jvm/java-7-openjdk-amd64/jre/bin/java"
export EC2_HOME=/usr/local/ec2/ec2-api-tools-1.7.2.3
export PATH=$PATH:$EC2_HOME/bin
export AWS_ACCESS_KEY=your-aws-access-key-id
export AWS_SECRET_KEY=your-aws-secret-key
export EC2_URL=https://eu-west-1

sudo apt-get install python-pip
sudo pip install awscli
aws configure

aws s3 sync /var/www/ilovestage.co.uk/build/www s3:///cdn.wordpress-starter-kit.com --exclude .DS_Store
