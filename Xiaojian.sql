# Host: 192.168.3.110  (Version 5.6.28-log)
# Date: 2019-08-26 17:00:10
# Generator: MySQL-Front 6.0  (Build 2.25)


#
# Structure for table "course"
#

CREATE TABLE `course` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(60) NOT NULL DEFAULT '',
  `courseAbstract` varchar(255) DEFAULT NULL,
  `h5Address` varchar(100) DEFAULT NULL,
  `courseThumb` varchar(80) DEFAULT NULL,
  `courseType` tinyint(3) NOT NULL DEFAULT '0' COMMENT '0:基础课程 1：辅助课程 2：体育课程',
  `courseSubType` smallint(6) DEFAULT NULL COMMENT '0:成语故事 1：儿童诗歌 2：常识 3：美术 4：篮球',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "course"
#


#
# Structure for table "course_choose"
#

CREATE TABLE `course_choose` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `shopId` int(11) NOT NULL DEFAULT '0',
  `courseNumber` tinyint(3) DEFAULT NULL COMMENT '1: 9:00-10:00 2:13:00-14:00 3:16:00-17:00 4:19:00-20:00',
  `teacherId` int(11) NOT NULL DEFAULT '0',
  `courseAId` int(11) DEFAULT NULL,
  `courseBId` int(11) DEFAULT NULL,
  `xclassId` int(11) NOT NULL DEFAULT '0' COMMENT '班级ID',
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `shopId` (`shopId`,`teacherId`,`courseAId`,`courseBId`,`xclassId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "course_choose"
#


#
# Structure for table "role"
#

CREATE TABLE `role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(15) DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "role"
#

INSERT INTO `role` VALUES (1,'manage','2019-08-26 09:34:49'),(2,'teacher','2019-08-26 09:34:49'),(3,'student','2019-08-26 09:34:49');

#
# Structure for table "shop"
#

CREATE TABLE `shop` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `shopName` varchar(60) NOT NULL DEFAULT '',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "shop"
#

INSERT INTO `shop` VALUES (1,'A店','2019-08-26 11:56:39'),(2,'B店','2019-08-26 11:56:51'),(3,'C店','2019-08-26 11:57:13');

#
# Structure for table "student"
#

CREATE TABLE `student` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `studentName` varchar(30) NOT NULL DEFAULT '',
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "student"
#


#
# Structure for table "user"
#

CREATE TABLE `user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(60) NOT NULL DEFAULT '',
  `shopId` int(11) NOT NULL DEFAULT '0',
  `realname` varchar(20) DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'cidic','',1,'张老师','2019-08-26 11:58:04',NULL),(2,'admin','',0,'管理员','2019-08-26 11:58:29',NULL);

#
# Structure for table "user_role"
#

CREATE TABLE `user_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT '0',
  `roleId` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `userId` (`userId`,`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "user_role"
#

INSERT INTO `user_role` VALUES (1,1,2),(2,2,1);

#
# Structure for table "xclass"
#

CREATE TABLE `xclass` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(30) NOT NULL DEFAULT '',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "xclass"
#


#
# Structure for table "xclass_student"
#

CREATE TABLE `xclass_student` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `xclassId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `courseId` (`xclassId`,`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "xclass_student"
#

