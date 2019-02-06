package net.daw.dao.daoImplementation_1;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import net.daw.bean.beanImplementation.FacturaBean;
import net.daw.bean.beanImplementation.UsuarioBean;
import net.daw.dao.genericDaoImplementation.GenericDaoImplementation;
import net.daw.dao.publicDaoInterface.DaoInterface;
import net.daw.helper.SqlBuilder;

public class FacturaDao_1 extends GenericDaoImplementation implements DaoInterface {

    public FacturaDao_1(Connection oConnection, String ob, UsuarioBean oUsuarioBeanSession) {
        super(oConnection, ob, oUsuarioBeanSession);

    }

    public ArrayList<FacturaBean> getpageusuario(int iRpp, int iPage, HashMap<String, String> hmOrder, int idUsuario, Integer expand) throws Exception {
        String strSQL = "SELECT * FROM " + ob;
        strSQL += SqlBuilder.buildSqlOrder(hmOrder);
        ArrayList<FacturaBean> alFacturaBean;
        if (iRpp > 0 && iRpp < 100000 && iPage > 0 && iPage < 100000000) {
            strSQL += " WHERE id_usuario=? ";
            strSQL += " LIMIT " + (iPage - 1) * iRpp + ", " + iRpp;
            ResultSet oResultSet = null;
            PreparedStatement oPreparedStatement = null;
            try {
                oPreparedStatement = oConnection.prepareStatement(strSQL);
                oPreparedStatement.setInt(1, idUsuario);
                oResultSet = oPreparedStatement.executeQuery();
                alFacturaBean = new ArrayList<FacturaBean>();

                while (oResultSet.next()) {
                    FacturaBean oFacturaBean = new FacturaBean();
                    oFacturaBean.fill(oResultSet, oConnection, expand, oUsuarioBeanSession);
                    alFacturaBean.add(oFacturaBean);
                }
            } catch (SQLException e) {
                throw new Exception("Error en Dao getpageXusuario de " + ob, e);
            } finally {
                if (oResultSet != null) {
                    oResultSet.close();
                }
                if (oPreparedStatement != null) {
                    oPreparedStatement.close();
                }
            }
        } else {
            throw new Exception("Error en Dao getpage de " + ob);
        }
        return alFacturaBean;

    }
}
