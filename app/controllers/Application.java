package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }
    
    public static Result fetch(String pmid){
    	String r = "NA";
    	try {
			
			URL url = new URL("http://www.ncbi.nlm.nih.gov/pubmed/"+pmid+"?report=xml&format=text");
			
			// read text returned by server
		    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
		    
		    String line;
		    String lines = "";
		    while ((line = in.readLine()) != null) {
		    	lines = lines + "\n" +line;
		    }
		    in.close();
		    r = lines;
		    
		}catch (MalformedURLException e) {
			//System.out.println("Malformed URL: " + e.getMessage());
		    r = "Malformed URL";
		}
		catch (IOException e) {
			//System.out.println("I/O Error: " + e.getMessage());
			r = "I/O Error";
		}
    	
    	//response().setHeader(ETAG, "xxx");
    	return ok(r.trim(), "utf-8").as("text/plain");
    }

}
