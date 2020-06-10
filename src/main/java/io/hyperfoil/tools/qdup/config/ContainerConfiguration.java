package io.hyperfoil.tools.qdup.config;

public class ContainerConfiguration {

    private String image;
    private String name;

    public ContainerConfiguration(String image, String name) {
        this.image = image;
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public String getName() {
        return name;
    }
}
