
docker exec -it db1 /bin/bash
mysql -uroot -padmin

CREATE TABLE posts( topic VARCHAR(255) NOT NULL, data TEXT(65535) NOT NULL, timestamp DATETIME NOT NULL);


var queries = [
        "CREATE TABLE customers(\
        customerID INT NOT NULL AUTO_INCREMENT,\
        firstName VARCHAR(255) NOT NULL,\
        lastName VARCHAR(255) NOT NULL,\
        phoneNumber VARCHAR(10) NOT NULL,\
        location TEXT(1000) NOT NULL,\
        PRIMARY KEY(customerID),\
        UNIQUE(phoneNumber)\
        );",
        "CREATE TABLE roles(\
        roleID INT NOT NULL AUTO_INCREMENT,\
        roleName VARCHAR(255) NOT NULL,\
        roleDescription VARCHAR(255),\
        PRIMARY KEY(roleID)\
        );",
        "CREATE TABLE staffs(\
        staffID INT NOT NULL AUTO_INCREMENT,\
        roleID INT,\
        firstName VARCHAR(255) NOT NULL,\
        lastName VARCHAR(255) NOT NULL,\
        phoneNumber VARCHAR(9) NOT NULL,\
        PRIMARY KEY (staffID),\
        FOREIGN KEY (roleID) REFERENCES roles(roleID)\
        );",
        "CREATE TABLE requestTypes(\
        requestTypeID INT NOT NULL AUTO_INCREMENT,\
        requestTypeName VARCHAR(255) NOT NULL,\
        requestTypeDescription VARCHAR(255) NOT NULL,\
        PRIMARY KEY (requestTypeID)\
        );",
        "CREATE TABLE requestStates(\
        requestStateID INT NOT NULL AUTO_INCREMENT,\
        requestStateName VARCHAR(255) NOT NULL,\
        requestStateDescription VARCHAR(255),\
        PRIMARY KEY (requestStateID)\
        );",
        "CREATE TABLE reports(\
        reportID INT NOT NULL AUTO_INCREMENT,\
        customerID INT NOT NULL,\
        staffID INT NOT NULL,\
        time DATETIME NOT NULL,\
        requestType INT NOT NULL,\
        requestState INT NOT NULL,\
        situationDescription TEXT(60000),\
        staffNotes TEXT(60000),\
        PRIMARY KEY (reportID),\
        FOREIGN KEY (customerID) REFERENCES customers(customerID),\
        FOREIGN KEY (staffID) REFERENCES staffs(staffID),\
        FOREIGN KEY (requestType) REFERENCES requestTypes(requestTypeID),\
        FOREIGN KEY (requestState) REFERENCES requestStates(requestStateID)\
        );",
        "CREATE TABLE posts( topic VARCHAR(255) NOT NULL, data TEXT(65535) NOT NULL, timestamp DATETIME NOT NULL);"
];


        CREATE TABLE ddd(\
        customerID INT NOT NULL AUTO_INCREMENT,\
        firstName VARCHAR(255) NOT NULL,\
        lastName VARCHAR(255) NOT NULL,\
        phoneNumber VARCHAR(10) NOT NULL,\
        location TEXT(1000) NOT NULL,\
        PRIMARY KEY(customerID),\
        UNIQUE(phoneNumber)\
        );

        CREATE TABLE customers(\
        customerID INT NOT NULL AUTO_INCREMENT,\
        firstName VARCHAR(255) NOT NULL,\
        lastName VARCHAR(255) NOT NULL,\
        phoneNumber VARCHAR(10) NOT NULL,\
        location TEXT(1000) NOT NULL,\
        PRIMARY KEY(customerID),\
        UNIQUE(phoneNumber)\
        );

        CREATE TABLE roles(\
        roleID INT NOT NULL AUTO_INCREMENT,\
        roleName VARCHAR(255) NOT NULL,\
        roleDescription VARCHAR(255),\
        PRIMARY KEY(roleID)\
        );

        CREATE TABLE staffs(\
        staffID INT NOT NULL AUTO_INCREMENT,\
        roleID INT,\
        firstName VARCHAR(255) NOT NULL,\
        lastName VARCHAR(255) NOT NULL,\
        phoneNumber VARCHAR(9) NOT NULL,\
        PRIMARY KEY (staffID),\
        FOREIGN KEY (roleID) REFERENCES roles(roleID)\
        );

        CREATE TABLE requestTypes(\
        requestTypeID INT NOT NULL AUTO_INCREMENT,\
        requestTypeName VARCHAR(255) NOT NULL,\
        requestTypeDescription VARCHAR(255) NOT NULL,\
        PRIMARY KEY (requestTypeID)\
        );

        CREATE TABLE requestStates(\
        requestStateID INT NOT NULL AUTO_INCREMENT,\
        requestStateName VARCHAR(255) NOT NULL,\
        requestStateDescription VARCHAR(255),\
        PRIMARY KEY (requestStateID)\
        );

        CREATE TABLE reports(\
        reportID INT NOT NULL AUTO_INCREMENT,\
        customerID INT NOT NULL,\
        staffID INT NOT NULL,\
        time DATETIME NOT NULL,\
        requestType INT NOT NULL,\
        requestState INT NOT NULL,\
        situationDescription TEXT(60000),\
        staffNotes TEXT(60000),\
        PRIMARY KEY (reportID),\
        FOREIGN KEY (customerID) REFERENCES customers(customerID),\
        FOREIGN KEY (staffID) REFERENCES staffs(staffID),\
        FOREIGN KEY (requestType) REFERENCES requestTypes(requestTypeID),\
        FOREIGN KEY (requestState) REFERENCES requestStates(requestStateID)\
        );
        CREATE TABLE posts( topic VARCHAR(255) NOT NULL, data TEXT(65535) NOT NULL, timestamp DATETIME NOT NULL);
