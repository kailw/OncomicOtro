/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.service.publicServiceInterface;

import net.daw.bean.beanImplementation.ReplyBean;

/**
 *
 * @author kevin
 */
public interface ServiceInterface {

    public ReplyBean get() throws Exception;

    public ReplyBean remove() throws Exception;

    public ReplyBean getcount() throws Exception;
    
    public ReplyBean getpage() throws Exception;

    public ReplyBean create() throws Exception;

    public ReplyBean update() throws Exception;

    public ReplyBean getpageX() throws Exception;

}
