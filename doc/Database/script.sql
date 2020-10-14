CREATE TABLE APTECH_DMGIAOVIEN (
    GV_MSGV nvarchar(30),
	GV_UserName nvarchar(MAX),
	GV_PassWord nvarchar(MAX),
    GV_HOTEN nvarchar(100),
    GV_DIENTHOAI ntext,
	GV_EMAIL nvarchar(50),
	GV_ROLE int,
    CONSTRAINT PK_APTECH_DMGIAOVIEN PRIMARY KEY (GV_MSGV)
);

CREATE TABLE APTECH_DIEMDANH (
    DD_ID INT IDENTITY(1,1),	
	GV_MSGV nvarchar(30),
    LOP_ID nvarchar(30),
	MH_ID nvarchar(30),
	SO_BUOI int,
	TRANG_THAI int
    CONSTRAINT PK_APTECH_DIEMDANH PRIMARY KEY (DD_ID)
);

CREATE TABLE APTECH_CTDIEMDANH (
    CTDD_ID INT IDENTITY(1,1),
	DD_ID int,
    SV_MSSV nvarchar(30),
	DIEM_DANH text,
	KQDD nvarchar(100),
	BUOI_HIEN_TAI int
    CONSTRAINT PK_APTECH_CTDIEMDANH PRIMARY KEY (CTDD_ID)
);

INSERT INTO APTECH_DMGIAOVIEN (GV_MSGV, GV_HOTEN, GV_UserName, GV_PassWord, GV_DIENTHOAI, GV_EMAIL, GV_ROLE) VALUES
('qbvan', N'Quách Bích Vân', 'qbvan', '123456789', NULL, NULL, 1),
('tlmphuong', N'Trần Lê Mỹ Phương', 'tlmphuong', '123456789', NULL, NULL, 1),
('dtmman', N'Đỗ Thị Minh Mẫn', 'dtmman', '123456789', NULL, NULL, 1),
('ptkdiem', N'Phạm Thị Kiều Diễm', 'ptkdiem', '123456789', NULL, NULL, 1),
('ltmloan', N'Lê Thị Minh Loan', 'ltmloan', '123456789', NULL, NULL, 2),
('vdanh', N'Võ Duy Anh', 'vdanh', '123456789', NULL, NULL, 2),
('ntkien', N'Nguyễn Trung Kiên', 'ntkien', '123456789', NULL, NULL, 2),
('ltanh', N'Lương Thế Anh', 'ltanh', '123456789', NULL, NULL, 2),
('nvnga', N'Nguyễn Việt Nga', 'nvnga', '123456789', NULL, NULL, 2),
('dhhnguyen', N'Đoàn Hồ Hạnh Nguyên', 'dhhnguyen', '123456789', NULL, NULL, 2),
('nhson', N'Nguyễn Hồng Sơn', 'nhson', '123456789', NULL, NULL, 2),
('cvloc', N'Cù Vĩnh Lộc', 'cvloc', '123456789', NULL, NULL, 2),
('ltdao', N'Lưu Tiến Đạo', 'ltdao', '123456789', NULL, NULL, 2);