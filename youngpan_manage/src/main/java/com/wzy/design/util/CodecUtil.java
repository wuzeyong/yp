/*
 *--------------------------------------
 * Apusic (Kingdee Middleware)
 *---------------------------------------
 * Copyright By Apusic ,All right Reserved
 * kevins   2013-6-26   comment
 * kevins  2013-6-26  Created
 */
package com.wzy.design.util;

import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;

import org.apache.commons.codec.binary.Base64;


/**
 * Base64,Digest,AES工具类 
 * <li>功能简述:
 * <li>详细描述:
 * @author  wzy
 * @version  [1.0 Dec 2, 2014]
 * @see  [相关类/方法]
 * @since  1.0
 */
public class CodecUtil {

    public static final String DIGEST_SHA_256 = "SHA-256";

    public static final String AES_ALGORITHM_NAME = "AES";

    private static final char[] HEX_CHARS = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e',
                                             'f'};

    private static final String DIGEST_MD5 = "MD5";

    /*********************************************************/
    /*********************************************************/
    /*********************     DIGEST     ***********************/
    /*********************************************************/
    /*********************************************************/
    
    /**
     * digest
     * 
     * @param source
     * @return
     */
    public static byte[] digestBySHA256(byte[] source) {
        MessageDigest md5Digest = getDigest(DIGEST_SHA_256);
        return md5Digest.digest(source);
    }

    /**
     * digest to Hex
     * 
     * @param source
     * @return
     */
    public static char[] digestBySHA256AsHex(byte[] source) {
            return digestAsHexString(DIGEST_SHA_256, source);
    }
    
    public static char[] digestByMd5AsHex(byte[] source) {
        return digestAsHexString(DIGEST_MD5, source);
}

    /**********************************************/
    /**********************************************/
    /**************     base64    *****************/
    /**********************************************/
    /**********************************************/
    
    /**
     * base64编码
     * @param source
     * @return
     */
    public static byte[] base64Encode(byte[] source){
        Base64 base64 = new Base64(false);
        return base64.encode(source);
    }
    
    /**
     * base64编码，结果时URL安全的
     * @param source
     * @return
     */
    public static byte[] base64EncodeUrlSafe(byte[] source){
        Base64 base64 = new Base64(true);
        return base64.encode(source);
    }
    
    /**
     * base64解码
     * @param source
     * @return
     */
    public static byte[] base64Decode(byte[] source) {
        return new Base64().decode(source);
    }
    
    /**
     * base64解码
     * @param source
     * @return
     */
    public static byte[] base64DecodeURLSafe(byte[] source) {
        return new Base64(true).decode(source);
    }
    
    /**********************************************/
    /**********************************************/
    /**************      AES      *****************/
    /**********************************************/
    /**********************************************/
    
    
    /**
     * 创建AES 的key
     * @return
     */
    public static Key createAESKey() {

        try {
            KeyGenerator keygen = KeyGenerator.getInstance(AES_ALGORITHM_NAME);
            SecureRandom random = new SecureRandom();
            keygen.init(random);
            return keygen.generateKey();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Could not find MessageDigest with algorithm \"" + AES_ALGORITHM_NAME
                                            + "\"", e);
        }
    }

    /**
     * AES加密
     * @param source
     * @param key
     * @return
     */
    public static byte[] aesEncrypt(byte[] source, Key key) {

        try {
            Cipher cipher = Cipher.getInstance(AES_ALGORITHM_NAME);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            return cipher.doFinal(source);
        } catch (Exception e) {
            throw new IllegalStateException("AES ecnrypt error", e);
        }
    }

    /**
     * AES 解密
     * @param source
     * @param key
     * @return
     */
    public static byte[] aesDecrypt(byte[] source, Key key) {

        try {
            Cipher cipher = Cipher.getInstance(AES_ALGORITHM_NAME);
            cipher.init(Cipher.DECRYPT_MODE, key);
            return cipher.doFinal(source);
        } catch (Exception e) {
            throw new IllegalStateException("AES decnrypt error", e);
        } 
    }

    
    
    private static MessageDigest getDigest(String algorithm) {
        try {
            return MessageDigest.getInstance(algorithm);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Could not find MessageDigest with algorithm \"" + algorithm + "\"", e);
        }
    }

    private static byte[] digest(String algorithm, byte[] bytes) {
        return getDigest(algorithm).digest(bytes);
    }

    private static char[] digestAsHexString(String algorithm, byte[] bytes) {
        return digestAsHexChars(algorithm, bytes);
    }

    private static char[] digestAsHexChars(String algorithm, byte[] bytes) {
        byte[] digest = digest(algorithm, bytes);
        return encodeHex(digest);
    }

    private static char[] encodeHex(byte[] bytes) {
        char chars[] = new char[bytes.length * 2];
        for (int i = 0; i < chars.length; i = i + 2) {
            byte b = bytes[i / 2];
            chars[i] = HEX_CHARS[(b >>> 0x4) & 0xf];
            chars[i + 1] = HEX_CHARS[b & 0xf];
        }
        return chars;
    }
    
    
    /**
     * 将二进制转换成16进制
     * 
     * @param buf
     * @return
     */
    public static String parseByte2HexStr(byte buf[]) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < buf.length; i++) {
            String hex = Integer.toHexString(buf[i] & 0xFF);
            if (hex.length() == 1) {
                hex = '0' + hex;
            }
            sb.append(hex.toUpperCase());
        }
        return sb.toString();
    }

    /**
     * 将16进制转换为二进制
     * 
     * @param hexStr
     * @return
     */
    public static byte[] parseHexStr2Byte(String hexStr) {
        if (hexStr.length() < 1) {
            return null;
        }
        byte[] result = new byte[hexStr.length() / 2];
        for (int i = 0; i < hexStr.length() / 2; i++) {
            int high = Integer.parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
            int low = Integer.parseInt(hexStr.substring(i * 2 + 1, i * 2 + 2), 16);
            result[i] = (byte) (high * 16 + low);
        }
        return result;
    }
    
}
