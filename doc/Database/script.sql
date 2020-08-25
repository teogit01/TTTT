CREATE TABLE APTECH_DMGIAOVIEN (
    GV_MSGV varchar(30) PRIMARY KEY,
	GV_UserName varchar(MAX),
	GV_PassWord varchar(MAX),
    GV_HOTEN varchar(100),
    GV_DIENTHOAI text,
	GV_EMAIL varchar(50),
);

CREATE TABLE APTECH_DMLOPHOCPHAN (
	LHP_ID int PRIMARY KEY UNIQUE,
	GV_MSGV varchar(30),
	MH_ID varchar(30),
	LHP_MA varchar(30),
	LHP_TEN varchar(100),
	LHP_TONGBUOI int,
);

CREATE TABLE APTECH_DIEMDANH (
    SV_MSSV varchar(30) PRIMARY KEY,
    LHP_ID int,
    DIEM_DANH text,
    SO_BUOI int,
	KQDD int,
);

CREATE TABLE APTECH_SINHVIEN (
    SV_MSSV varchar(30) PRIMARY KEY,
    SV_HOTEN int,
    EMAIL varchar(255),
);
CREATE TABLE APTECH_MONHOC (
    MH_ID varchar(30) PRIMARY KEY,
    MH_TEN int,
);


ALTER TABLE  APTECH_DMLOPHOCPHAN
	ADD CONSTRAINT FK_DMLOPHOCPHAN_DMGIAOVIEN FOREIGN KEY (GV_MSGV) REFERENCES APTECH_DMGIAOVIEN(GV_MSGV);

ALTER TABLE  APTECH_DMLOPHOCPHAN
	ADD CONSTRAINT FK_DMLOPHOCPHAN_DMMONHOC FOREIGN KEY (MH_ID) REFERENCES APTECH_DMMONHOC(MH_ID);

ALTER TABLE  APTECH_DIEMDANH
	ADD CONSTRAINT FK_DIEMDANH_DMSINHVIEN FOREIGN KEY (SV_MSSV) REFERENCES APTECH_DMSINHVIEN(SV_MSSV);

ALTER TABLE APTECH_DIEMDANH
	ADD CONSTRAINT FK_DIEMDANH_DMLOPHOCPHAN FOREIGN KEY (LHP_ID) REFERENCES APTECH_DMLOPHOCPHAN(LHP_ID);s