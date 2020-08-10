CREATE TABLE APTECH_DMGIAOVIEN (
    GV_MSGV nvarchar(30),
	GV_UserName nvarchar(MAX),
	GV_PassWord nvarchar(MAX),
    GV_HOTEN nvarchar(100),
    GV_DIENTHOAI ntext,
	GV_EMAIL nvarchar(50),
    CONSTRAINT PK_APTECH_DMGIAOVIEN PRIMARY KEY (GV_MSGV)
);

CREATE TABLE APTECH_DMLOPHOCPHAN (
	LHP_ID int,
	GV_MSGV nvarchar(30),
	MH_ID nvarchar(30),
	LHP_MA nvarchar(30),
	LHP_TEN nvarchar(100),
	LHP_TONGBUOI int,
	CONSTRAINT PK_APTECH_DMLOPHOCPHAN PRIMARY KEY (LHP_ID),
	CONSTRAINT UC_APTECH_DMLOPHOCPHAN UNIQUE (LHP_MA)
);

CREATE TABLE APTECH_DIEMDANH (
    SV_MSSV nvarchar(30),
    LHP_ID int,
    DIEM_DANH ntext,
    SO_BUOI int,
	KQDD int,
    CONSTRAINT PK_APTECH_DIEMDANH PRIMARY KEY (SV_MSSV,LHP_ID)
);

ALTER TABLE  APTECH_DMLOPHOCPHAN
	ADD CONSTRAINT FK_DMLOPHOCPHAN_DMGIAOVIEN FOREIGN KEY (GV_MSGV) REFERENCES APTECH_DMGIAOVIEN(GV_MSGV);

ALTER TABLE  APTECH_DMLOPHOCPHAN
	ADD CONSTRAINT FK_DMLOPHOCPHAN_DMMONHOC FOREIGN KEY (MH_ID) REFERENCES APTECH_DMMONHOC(MH_ID);

ALTER TABLE  APTECH_DIEMDANH
	ADD CONSTRAINT FK_DIEMDANH_DMSINHVIEN FOREIGN KEY (SV_MSSV) REFERENCES APTECH_DMSINHVIEN(SV_MSSV);

ALTER TABLE APTECH_DIEMDANH
	ADD CONSTRAINT FK_DIEMDANH_DMLOPHOCPHAN FOREIGN KEY (LHP_ID) REFERENCES APTECH_DMLOPHOCPHAN(LHP_ID);s