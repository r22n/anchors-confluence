# anchors-confluence
enable anchors which is heading of markdown scroll within page

https://docs.adaptavist.com/sr4c/7.1.0/features/macros/built-in-macros/markdown


## how to use

1. insert [your markdown macro](https://docs.adaptavist.com/sr4c/7.1.0/features/macros/built-in-macros/markdown)

    - e.g.
    
        ```
            # section 1
                - please see [here](#anchor)
                -            ^ markdown macro disable anchor link scroll to 

            # anchor
                ...
        ```

2. put [html macro](https://confluence.atlassian.com/conf74/html-macro-1003128855.html) 

    - set this macro contents [this](index.js)
    - put after your markdown macro
    