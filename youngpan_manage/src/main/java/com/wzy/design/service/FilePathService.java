package com.wzy.design.service;


import java.util.List;

import com.wzy.design.entity.FileInfo;

public interface FilePathService {

	List<FileInfo> remove(FileInfo removedFileInfo);

}
